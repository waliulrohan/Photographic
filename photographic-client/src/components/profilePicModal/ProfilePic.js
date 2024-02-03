import React, { useEffect, useRef, useState } from 'react';
import './profilePic.css'
import { toast } from 'react-hot-toast';
const ProfilePic = ({setProfilePicModal , photo}) => {
    const myId = sessionStorage.getItem("myId");
    const token = sessionStorage.getItem("token");
    const hiddenFileInput = useRef(null);
    const [imageUrl, setImageUrl] = useState('');


 // remove profile pic   
const removeProfilePic =()=>{
if(photo === "https://res.cloudinary.com/dlaikb0id/image/upload/v1705229649/noProfile_cy0wyc.png "){
    toast.error("Profile pic already removed")    
}else{
           if (token) {
            fetch('http://localhost:5000/user/removeProfilePic', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },

            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        toast.error(data.error);
                    } else {
                        sessionStorage.setItem('myDp',data.photo)
                        setProfilePicModal(false)
                        toast.success('Profile pic removed');
                    }
                })
                .catch((error) => {
                    console.error('Error during fetch:', error);
                });
        } 
}


}


//upload  profile pic
const uploadProfilePic =()=>{
    if (imageUrl) {
        if (token) {
            fetch('http://localhost:5000/user/uploadProfilePic', {
                method: 'PUT',
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
                        sessionStorage.setItem('myDp',data.photo)
                        setProfilePicModal(false)
                        toast.success('Profile pic uploaded');
                    }
                })
                .catch((error) => {
                    console.error('Error during fetch:', error);
                });
        }
    

}}

    const handleFileChange = async (event) => {
        const files = event.target.files;
        const file = files && files.length ? files[0] : null;
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



    const fileInputClick =()=>{
        hiddenFileInput.current.click();
    }

useEffect(()=>{
    if(imageUrl){
        uploadProfilePic()
    }
},[imageUrl])
    return (
        <div className='profile-modal'>
            <div className="profile-modal-main">
                <div className="profile-modal-button" onClick={()=> fileInputClick()} style={{ borderBottom:" 1px solid #e7e7e7"}}>
                     <p>Upload profile pic</p>
                     <input type="file" name="" id="" onChange={handleFileChange}  ref={hiddenFileInput}  style={{ display:"none"}}/>
                </div>

                <div className="profile-modal-button" onClick={()=> removeProfilePic()}  style={{ borderBottom:" 1px solid #e7e7e7"}}>
                    <p style={{ color:'red' }}>Remove Profile pic</p>
               </div>

               <div onClick={()=> setProfilePicModal(false)} className="profile-modal-button">
                    <p>Cancel</p>
               </div>

            </div>
        </div>
    );
};

export default ProfilePic;