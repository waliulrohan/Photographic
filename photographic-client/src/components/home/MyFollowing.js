import React, { useContext, useEffect, useState } from 'react';
import './home.css'
import Sidebar from './Sidebar';
import Card from './Card';
import Right from './Right';
import Navbar from '../navbar/Navbar';
import { CreateModal } from '../../App';
import CardSkeletons from '../loadingSkeletons/CardSkeletons';
const MyFollowing = () => {
// title
document.title = "Photographic-Following"

    const token = sessionStorage.getItem("token");
    const myId = sessionStorage.getItem("myId");
    const [myData, setMyData] = useState({});
    const [ followingPosts , setFollowingPosts  ] = useState([])
    const [followingStory , setFollowingStory] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {

        if (token && myData.following) {
            fetch("https://photographic-server.onrender.com/post/myFollowingPosts", {
                method: "post",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    following : myData.following,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    setFollowingPosts(data)
                });

                // following story
                fetch("https://photographic-server.onrender.com/story/followingStory", {
                    method: "post",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        following : myData.following,
                    }),
                })
                    .then(res => res.json())
                    .then(data => {
                        setLoading(false)
                        setFollowingStory(data)
                    });

        }



    }, [myData])
    
// setting myData
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
                });
        }
    }, [])


    return (
        <div className='home-main' >

            <Navbar></Navbar>
            <div className='home-con'>

                <Sidebar></Sidebar>


        {loading?
         <div id='all-cards' className='all-cards'>
                 <CardSkeletons />
        </div>
        :
        <div id='all-cards' className='all-cards'>
          {followingPosts ? (
            followingPosts.map(post => <Card post={post} key={post._id} />)

          ) : (
            'loading....'
          )}

          <div className='invisible-space'>
            <h1>space</h1>
          </div>
        </div>
      }


                <Right stories={followingStory}></Right>

            </div>
        </div>

    );
};

export default MyFollowing;