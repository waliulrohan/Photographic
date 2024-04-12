import React, { useContext, useState } from 'react';
import './createStory.css'

import { CreateModal } from '../../App';
import { toast } from 'react-hot-toast';
import { Dialog, IconButton } from '@mui/material';
import Loading from '../../shared/Loading';
import LoginLoading from '../loadingSkeletons/LoginLoading';

const CreateStory = () => {
    const dialogStyle = {
        height: "90vw",
        width: "80vw",
        borderRadius: '10px 10px 10px 10px',
    };
 
    const { storyModal,setStoryModal } = useContext(CreateModal);


    const [loading , setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const token = sessionStorage.getItem("token");
    const [inputFile , setInputFile] = useState(null)

    const handleFileChange = async (event) => {
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
       setLoading(true)
        if (inputFile) {
            setInputFile(null)
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
                            if (token) {
                                fetch('https://photographic-server.onrender.com/story/createStory', {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        photo: result.secure_url,
                                    }),
                                })
                                    .then((res) => res.json())
                                    .then((data) => {
                                        if (data.error) {
                                            toast.error(data.error);
                                        } else {
                                            toast.success(data.message)
                                            setStoryModal(false)
                                            setInputFile(null)
                                            setImageUrl('')
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
        } else if (!inputFile) {
            toast.error('Please choose an image');
        }

    };

    return (
          <Dialog
          open={storyModal}
          PaperProps={{ sx: dialogStyle }}
          onClose={() =>setStoryModal(false)}
             >
                {loading && <LoginLoading />}
            <div className="story-share-con">
                <button className="story-share-button" onClick={()=> setStoryModal(false)}>
                    close
                </button>
             { inputFile ?   <button className="story-share-button" onClick={handleShare} style={{cursor:'pointer'}} >
                    Share
                </button>
                
                :
                <button className="story-share-button" style={{ color: "#f9d0d0" }}>
                Share
            </button>
                }
            </div>

            <div className="story-modal-photo">
                <div className="story-outImage-frame">
                         <img className='story-outImage' src={imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSowjKGUP8tcOoGVNrVcuuCpZbN0jsyRwzclg&usqp=CAU'} alt="Story" />

                </div>
                <label htmlFor="picField" className='picFieldLabel'>
                    Choose image
                </label>
                <input type="file" name="picField" id="picField" size="24" onChange={handleFileChange} />
                
            </div>
          </Dialog>
    );
};

export default CreateStory;