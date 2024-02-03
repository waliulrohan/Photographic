import React, { useEffect, useState } from 'react';
import '../myProfile/myProfile.css'

import { useParams } from 'react-router-dom';
import PostDetail from '../postDetails/PostDetail';
import Navbar from '../navbar/Navbar';
import Sidebar from '../home/Sidebar';
import MyProfile from '../myProfile/MyProfile';
import ProfileSkeleton from '../loadingSkeletons/ProfileSkeleton';

const OtherProfile = () => {

    const [singlePost, setSinglePost] = useState({})
    const [showComment, setShowComment] = useState(false)
    const [myData, setMyData] = useState({});
    const [myPosts, setMyPosts] = useState([])
    const [feched, setFeched] = useState(false);
    const token = sessionStorage.getItem("token")

const {id} = useParams()
const myId = sessionStorage.getItem("myId");


// follow 
    const handleFollow = () => {
        if (token) {
            fetch("http://localhost:5000/user/follow", {
                method: "put",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    followId: id,
                }),
            })
                .then(res => res.json())
                .then(data => {
                   setMyData(data.user)
                });
        }

    }


    // unfollow 

    const handleUnfollow = () => {
        if (token) {
            fetch("http://localhost:5000/user/unfollow", {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    unfollowId: id,
                }),
            })
                .then(res => res.json())
                .then(data => {
                   setMyData(data.user)
                });
        }

    }



// user's data

useEffect(() => {
    if (id && token) {
        fetch(`http://localhost:5000/user/${id}`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },

        })
            .then(res => res.json())
            .then(data => {
                setMyData(data.user[0]);
            setMyPosts(data.post)

                setFeched(true)

            });
    }
}, [id])

    return (
<div>
    {id === myId ?
    <MyProfile /> 
    :
            <div className='home-main' >

            <Navbar></Navbar>
            <div className='home-con'>

                <Sidebar></Sidebar>

                {
                    !feched?
                    <ProfileSkeleton />
                    :
                                   <div className="all-cards profile">
                    <div className="profile-main">
                        <div className="profile-pic">
                            <div className="profile-pic-frame">
                                <img className='my-photo' src={myData.photo} alt="" />
                            </div>

                        </div>
                        <div className="profile-details">
                            <p className="profile-name">{myData.name}</p>
                            <p className="profile-email">{myData.email}</p>
                            {feched &&
                                <div className="profile-info">
                                    <p className="followers-count">{myData.followers.length}<span className="info-text"> followers </span></p>
                                    <p className="following-count">{myData.following.length}<span className="info-text"> following </span></p>
                                    <p className="posts-counts">{myPosts.length}<span className="info-text"> posts </span></p>

                                </div>}
                                {feched &&
                                    myData.followers.includes(sessionStorage.getItem("myId"))
                                    ?
                              <button onClick={()=> handleUnfollow()} className='edit-profile'>Unfollow</button>
                              :
                             <button onClick={()=> handleFollow()} className='edit-profile'>Follow</button>

                                }

                        </div>
                    </div>

                    <div className="profile-gallery">
                        {myPosts.map((post) => (
                            <div key={post._id}>
                                <img onClick={() => { setShowComment(true); setSinglePost(post) }} src={post.photo} alt="..." />
                                {
                                    showComment && (<div>
                                        <PostDetail post={singlePost} setShowComment={setShowComment} showComment={showComment} />
                                    </div>

                                    )

                                }
                            </div>
                        ))}
                    </div>


                    <div className="invisible-space">
                        <h1>space</h1>
                    </div>
                </div> 
                
                }



            </div>






        </div>
}
</div>


    );
};

export default OtherProfile;