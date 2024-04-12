import React, { useContext, useState } from 'react';
import './post-modal.css';
import { toast } from 'react-hot-toast';
import { CreateModal } from '../../App';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Dialog, IconButton } from '@mui/material';
import ImageView from '../ImageView./ImageView';
import LoginLoading from '../loadingSkeletons/LoginLoading';

const PostModal = () => {
    const { setModalIsOpen,setAllPosts , modalIsOpen } = useContext(CreateModal);
    const dialogStyle = {
        maxHeight: "100vh",
        maxWidth: '100vw',
        height: "100vh",
        width: "100vw",
        overflowX: 'hidden',
        overflowY: 'scroll',
        borderRadius: '0px',
        margin: '0px',
    };


    const [caption, setCaption] = useState('');
    const myId = sessionStorage.getItem("myId");
    const token = sessionStorage.getItem("token");
    const myDp = sessionStorage.getItem('myDp')

    const timeStirng = new Date();

    const [imageUrl, setImageUrl] = useState('');
    const [inputFile , setInputFile] = useState(null)
    const [ isZoom , setIsZoom] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleFileChange = async (event) => {
        setIsZoom(false)
        const files = event.target.files;
        const file = files && files.length ? files[0] : null;
        setInputFile(file)
        if (FileReader && files && files.length) {
            const reader = new FileReader();
            reader.onload = function () {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(files[0]);
        } else{
 console.log('something went wrong in file reader');
        }
    };



const handleShare = async () => {
      setInputFile(null)
      setLoading(true)
    if (inputFile && caption) {
        try {
            const formData = new FormData();
            formData.append("file", inputFile);
            formData.append("upload_preset", "waliul-photographic");
            formData.append("cloud_name", "dlaikb0id");

            const response = await fetch('https://api.cloudinary.com/v1_1/dlaikb0id/image/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                    if (result.secure_url) {
                        if (myId && token) {
                            fetch('https://photographic-server.onrender.com/post/createPost', {
                                method: 'POST',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    caption,
                                    photo: result.secure_url,
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
                                        setCaption('')
                                        setImageUrl('')
                                        setInputFile(null)
                                        setLoading(false)
                                    }
                                })
                                .catch((error) => {
                                    console.error('Error during fetch:', error);
                                });
                        }
                    }
            } else {
                console.error('Error uploading image to Cloudinary');
            }
        } catch (error) {
            console.error('Error uploading image to Cloudinary', error);
        }
    } else{
        toast.error('Caption and image are required!');
    }

};

const  autoResize = ()=> {
    const textarea = document.getElementById("caption-input");
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px"; 
}


    return (
        <Dialog
        open={modalIsOpen}
        PaperProps={{ sx: dialogStyle }}
        onClose={() =>setModalIsOpen(false)}
           >
            {loading && <LoginLoading />}
            <div className="post-modal-header">
                <button className="story-share-button" onClick={()=> setModalIsOpen(false)}>
                    close
                </button>

                { inputFile && caption ?   <button className="story-share-button" onClick={handleShare} style={{cursor:'pointer'}} >
                    Share
                </button>     
                :
                <button className="story-share-button" style={{ color: "#f9d0d0" }}>
                   Share
                </button>
                }

            </div>


           <div className='card-con' style={{marginTop:"60px"}}>
            <div className="card-header"> 
                <div className="card-frame">
                    <img
                    style={{ cursor: 'pointer' }}
                    src={myDp}
                    alt="........" className="card-dp" />
                </div>           
               <p className="time-stamp" id='card-skeleton-text' style={{width:"20%",height:"10px"}} ></p>
            </div>
            <div className="card-main">

                <div className="card-image glow">
                  <img  onClick={(()=> setIsZoom(true))}  className='card-image-photo' src={imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSowjKGUP8tcOoGVNrVcuuCpZbN0jsyRwzclg&usqp=CAU'} alt="loading...." />
                  {isZoom && imageUrl && <ImageView url={imageUrl} setIsZoom={setIsZoom} />}

                </div>
                <div className="flex-con"  style={{padding: '10px'}}>
                    <label htmlFor="picField" className='picFieldLabel'>
                        Choose image
                    </label>
                    <input type="file" name="picField" id="picField" size="24" onChange={handleFileChange} />
                </div>

                <div className="card-description">
                <textarea
                    name=""
                    id="caption-input"
                    placeholder='Add your thoughts... '
                    value={caption}
                    onInput={autoResize}
                    onChange={(e) => setCaption(e.target.value)}
                ></textarea>
                    <p className="time-stamp">{timeStirng.toLocaleDateString()}-{timeStirng.toLocaleTimeString()}</p>
                </div>

            </div>

        </div>

        </Dialog>
    );
};

export default PostModal;
