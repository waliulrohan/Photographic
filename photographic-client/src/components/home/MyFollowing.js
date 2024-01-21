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
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    following : myData.following,
                    token: token,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    setFollowingPosts(data)
                });
        }
    }, [myData])
//. setting myData
    useEffect(() => {
        if (myId && token) {
            fetch(`http://localhost:5000/user/${myId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                }),
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


                <Right></Right>

            </div>
        </div>

    );
};

export default MyFollowing;