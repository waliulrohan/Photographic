import React, { useContext, useState } from 'react';
import './post-modal.css';
import { toast } from 'react-hot-toast';
import { CreateModal } from '../../App';

const PostModal = () => {
    const { setModalIsOpen,setAllPosts } = useContext(CreateModal);


    const [imageSrc, setImageSrc] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSowjKGUP8tcOoGVNrVcuuCpZbN0jsyRwzclg&usqp=CAU');
    const [imageUrl, setImageUrl] = useState('');
    const [caption, setCaption] = useState('');
    const myId = sessionStorage.getItem("myId");
    const token = sessionStorage.getItem("token");

    const handleFileChange = async (event) => {
        const files = event.target.files;
        const file = files && files.length ? files[0] : null;

        if (FileReader && files && files.length) {
            const reader = new FileReader();
            reader.onload = function () {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(files[0]);
        } else {
            // Handle the case where FileReader is not supported
        }

        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "waliul-photographic");
                formData.append("cloud_name", "dlaikb0id");

                const response = await fetch('https://api.cloudinary.com/v1_1/dlaikb0id/image/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    setImageUrl(result.secure_url);
                } else {
                    console.error('Error uploading image to Cloudinary');
                }
            } catch (error) {
                console.error('Error uploading image to Cloudinary', error);
            }
        }
    };

    const handleShare = () => {
        if (imageUrl && caption) {
            if (myId && token) {
                fetch('http://localhost:5000/post/createPost', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        caption,
                        photo: imageUrl,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.error) {
                            toast.error(data.error);
                        } else {
                            setModalIsOpen(false)
                            toast.success(data.message);
                            setAllPosts(data.allPosts)
                        }
                    })
                    .catch((error) => {
                        console.error('Error during fetch:', error);
                    });
            }
        } else if (!caption && !imageUrl) {
            toast.error('Please add a caption and upload an image');
        } else if (!caption) {
            toast.error('Please add a caption');
        } else if (!imageUrl) {
            toast.error('Please upload an image');
        }
    };

    return (
        <div className='post-modal'>
            <div className="post-photo">
                <img id='outImage' src={imageSrc} alt="" />
                <label htmlFor="picField" className='picFieldLabel'>
                    Upload image
                </label>
                <input type="file" name="picField" id="picField" size="24" onChange={handleFileChange} />
            </div>
            <div className="post-caption">
                <textarea
                    name=""
                    id="caption-input"
                    cols="30"
                    rows="5"
                    placeholder='Add your thoughts... '
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                ></textarea>
                <button className="caption-button" onClick={handleShare}>
                    Share
                </button>
            </div>
        </div>
    );
};

export default PostModal;
