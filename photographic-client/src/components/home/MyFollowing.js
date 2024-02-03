import React, { useContext, useEffect, useState } from 'react';
import './home.css'
import Sidebar from './Sidebar';
import Card from './Card';
import Right from './Right';
import Navbar from '../navbar/Navbar';
import { CreateModal } from '../../App';
const MyFollowing = () => {
    const token = sessionStorage.getItem("token");
    const myId = sessionStorage.getItem("myId");
    const [myData, setMyData] = useState({});
    const [ followingPosts , setFollowingPosts  ] = useState([])

    useEffect(() => {

        if (token && myData.following) {
            fetch("http://localhost:5000/post/myFollowingPosts", {
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
        }
    }, [myData])
    
// setting myData
    useEffect(() => {
        if (myId && token) {
            fetch(`http://localhost:5000/user/${myId}`, {
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

    const fakeStories = [
        { photo: 'https://res.cloudinary.com/dlaikb0id/image/upload/v1705915715/fotor-ai-20231226222744_jnchnr.jpg' },
        { photo: 'https://res.cloudinary.com/dlaikb0id/image/upload/v1705917126/Cropped_Image_1000_ab9gql.webp' },   
        { photo: 'https://res.cloudinary.com/dlaikb0id/image/upload/v1706182498/Screen_Shot_2023-10-28_at_11.55.00_vxoujl.png' },
      ];
    return (
        <div className='home-main' >

            <Navbar></Navbar>
            <div className='home-con'>

                <Sidebar></Sidebar>
                <div className="all-cards">
                    {followingPosts ?
                      followingPosts.map(post => <Card post={post} key={post._id} />)
                        :
                        'loading.,....'

                    }

                    <div className="invisible-space">
    <h1>space</h1>
</div>
        
                </div>


                <Right stories={fakeStories}></Right>

            </div>
        </div>

    );
};

export default MyFollowing;