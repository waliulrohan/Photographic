import React, { useContext, useEffect, useState } from 'react';
import './home.css'
import Sidebar from './Sidebar';
import Right from './Right';
import { CreateModal } from '../../App';
import CardSkeletons from '../../components/loadingSkeletons/CardSkeletons';
import FollowingCard from './FollowingCard';
import Navbar from '../../components/navbar/Navbar';
import Card from './Card';
const MyFollowing = () => {
// title
document.title = "Photographic-Following"
const {  followingPosts , setFollowingPosts , myData, setMyData  } = useContext(CreateModal);

    const token = sessionStorage.getItem("token");
    const myId = sessionStorage.getItem("myId");
    const [followingStory , setFollowingStory] = useState([])
    const [loading,setLoading] = useState(true)
    const following  = JSON.parse(sessionStorage.getItem('following'))




    useEffect(() => {

        if (token ) {

                // following story
                fetch("https://photographic-server.onrender.com/story/followingStory", {
                    method: "post",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        following : JSON.parse(sessionStorage.getItem('following')),
                    }),
                })
                    .then(res => res.json())
                    .then(data => {
                        setFollowingStory(data)
                    });

        }
    }, [])

    



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
                    sessionStorage.setItem('following', JSON.stringify(data.user[0].following))

                });
        }
    }, [loading])



// handling post fetching with lAZY loading
    let skip = 0
    const [allCardsDiv, setAllCardsDiv] = useState(null);

    const fetchPosts = ()=>{ 
        if (token ) {
            console.log("setting")
            fetch(`https://photographic-server.onrender.com/post/myFollowingPosts?skip=${skip}`, {
                method: "post",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    following : JSON.parse(sessionStorage.getItem('following')),
                }),
            })
                .then(res => res.json())
                .then(data => {

                    setLoading(false)
                    setFollowingPosts(prevData => [...prevData, ...data])
                });
   
        }
    }


    const handleScroll = () => {
        if (!allCardsDiv) return;
    
        const { clientHeight, scrollTop, scrollHeight } = allCardsDiv;
        if (clientHeight + scrollTop >= scrollHeight) {
          setLoading(true)
          skip = skip + 10;
          fetchPosts();
        }
    
      };
    
      useEffect(() => {
        setAllCardsDiv(document.getElementById('all-cards'));
    }, []);
    
    useEffect(() => {
        if (!allCardsDiv) return;
        
        if(followingPosts.length === 0){
          fetchPosts();
          console.log('damn it')
        }
    
        allCardsDiv.addEventListener('scroll', handleScroll);
    
        return () => {
          if (allCardsDiv) {
            allCardsDiv.removeEventListener('scroll', handleScroll);
          }
        };
      }, [allCardsDiv]);
    
    

    return (
        <div className='home-main' >

            <Navbar></Navbar>
            <div className='home-con'>

                <Sidebar></Sidebar>


    

       
     
        
        <div id='all-cards' className='all-cards'>
          {followingPosts.length > 0 ? (
            followingPosts.map((post , index ) => <Card post={post} key={index}/>)

          ) : (
            <div className="all-cards no-story" style={{borderRight:"2.5px solid #efefef"}}>
                 <p>Posts of the people you follow will appear here</p>
            </div>
          )}

                    {loading &&  <CardSkeletons />}

          <div className='invisible-space'>
            <h1>space</h1>
          </div>
        </div>
      


                <Right stories={followingStory}></Right>

            </div>
        </div>

    );
};

export default MyFollowing;