import React, { useContext, useEffect, useRef, useState } from 'react';
import './myProfile.css'

import Sidebar from '../home/Sidebar';
import Navbar from '../navbar/Navbar';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import LogoutIcon from '@mui/icons-material/Logout';

// confirm dialogue

import { confirmAlert } from 'react-confirm-alert'; // Import
import './deletePost.css'; // Import css



import PostDetail from '../postDetails/PostDetail';
import { IconButton } from '@mui/material';
import { toast } from 'react-hot-toast';
import ProfilePic from '../profilePicModal/ProfilePic';
import ProfileSkeleton from '../loadingSkeletons/ProfileSkeleton';


const MyProfile = () => {
    // title
document.title = "Photographic-My Profile"

    const myId = sessionStorage.getItem("myId");
    const [singlePost, setSinglePost] = useState({})
    const [showComment, setShowComment] = useState(false)
    const [myData, setMyData] = useState({});
    const [myPosts, setMyPosts] = useState([])
    const [fetched, setFetched] = useState(false)
    const token = sessionStorage.getItem("token")
    const [profilePicModal  , setProfilePicModal] = useState(false)

    // delete confirm
    const deleteConfirm = (postId) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this post.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        // delete post 

                            if (token) {
                                fetch(`https://photographic-server.onrender.com/post/delete/${postId}`, {
                                    method: "POST",
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                        "Content-Type": "application/json",
                                    },
                                })
                                    .then(res => res.json())
                                    .then(data => {

                                        const newData = myPosts.filter(post => post._id !== data._id);
                                        setMyPosts(newData)
                                        setShowComment(false)
                                        toast.success("post deleted")

                                    });
                            }



                    }
                },
                {
                    label: 'No',
                    onClick: () => toast.error("You don't want to delete")
                }
            ]
        });
    };


    // logout confirm
    const handleLogout = (postId) => {
        confirmAlert({
            title: 'Log Out',
            message: 'Are you sure.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                         sessionStorage.removeItem("token");
                         sessionStorage.removeItem("myDp");
                         sessionStorage.removeItem("myId");
                         window.location.reload();
                    }
                },
                {
                    label: 'No',
                    onClick: () => toast.error("You don't want to logout")
                }
            ]
        });
    };




    useEffect(() => {
        if (myId && token) {
            fetch(`https://photographic-server.onrender.com/user/${myId}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then(res => res.json())
                .then(data => {
                    setMyData(data.user[0])

                    setFetched(true)

                });
        }
    }, [])

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if (token) {
            fetch("https://photographic-server.onrender.com/post/myPosts", {
                method: "post",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },

            })
                .then(res => res.json())
                .then(data => {
                    setMyPosts(data)
                });
        }
    }, [])
    return (
        <div className='home-main' >
   

            <Navbar></Navbar>
            <div className='home-con'>

                <Sidebar></Sidebar>

                {
                    !fetched ?
                    <ProfileSkeleton />
                    :
                   <div className="profile">
                    <div className="profile-main">
                        <div className="profile-pic">
                            <div onClick={()=> setProfilePicModal(true)} className="profile-pic-frame">
                                <img className='my-photo' src={myData.photo} alt="" />
                            </div>
                            {
                                profilePicModal &&   <ProfilePic photo={myData.photo} setProfilePicModal={setProfilePicModal}></ProfilePic> 
                            }

                        </div>
                        <div className="profile-details">
                            <p className="profile-name">{myData.name}</p>
                            <p className="profile-email">{myData.email}</p>
                   
                                <div className="profile-info">
                                    <p className="followers-count">{myData.followers.length}<span className="info-text"> followers </span></p>
                                    <p className="following-count">{myData.following.length}<span className="info-text"> following </span></p>
                                    <p className="posts-counts">{myPosts.length}<span className="info-text"> posts </span></p>

                                </div>
                            <button className='edit-profile'>Profile</button>
                            <button className='logout-button' onClick={()=> handleLogout()}><LogoutIcon  style={{ fill: 'rgba(108, 108, 235, 0.795)', fontSize: 20 }} /></button>
                        </div>
                    </div>

                    <div className="profile-gallery">
                        {myPosts.map((post) => (
                            <div key={post._id}>
                                <img onClick={() => { setShowComment(true); setSinglePost(post) }} src={post.photo} alt="..." />
                                {
                                    showComment && (<div>
                                        <PostDetail post={singlePost} setShowComment={setShowComment} showComment={showComment} />
                                        <div className="delete-post">
                                            <IconButton onClick={() => deleteConfirm(singlePost._id)}>
                                                <DeleteForeverRoundedIcon style={{ fill: '#0072ea', fontSize: 25 }}></DeleteForeverRoundedIcon>
                                            </IconButton>


                                        </div>
                                    </div>

                                    )

                                }
                            </div>
                        ))}
                        <div className="invisible-space">
                        <h1>space</h1>
                    </div>
                    </div>



                   </div>
                }



            </div>





        </div>

    );
};

export default MyProfile;