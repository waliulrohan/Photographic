import React, { useContext, useState } from 'react';
import './createStory.css'

import { CreateModal } from '../../App';
import { toast } from 'react-hot-toast';

const CreateStory = () => {


    const { storyModal,setStoryModal } = useContext(CreateModal);


    const [imageSrc, setImageSrc] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSowjKGUP8tcOoGVNrVcuuCpZbN0jsyRwzclg&usqp=CAU');
    const [imageUrl, setImageUrl] = useState('');
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
        } else{
 console.log('something went wrong in file reader');
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
        if (imageUrl) {
            if (token) {
                fetch('https://photographic-server.onrender.com/story/createStory', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        photo: imageUrl,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.error) {
                            toast.error(data.error);
                        } else {
                            toast.success(data.message)
                            setStoryModal(false)
                        }
                    })
                    .catch((error) => {
                        console.error('Error during fetch:', error);
                    });
            }
        } else if (!imageUrl) {
            toast.error('Please upload an image');
        }
    };

    return (
           <div className='story-modal'>
            <div className="story-share-con">
            <button className="story-share-button" onClick={handleShare}>
                    Share
                </button>
            </div>

            <div className="story-modal-photo">
                                <img className='story-outImage' src={imageSrc} alt="" />
                <label htmlFor="picField" className='picFieldLabel'>
                    Upload image
                </label>
                <input type="file" name="picField" id="picField" size="24" onChange={handleFileChange} />
            </div>


        </div>
    );
};

export default CreateStory;