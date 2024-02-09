import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StorySlide from '../storySlide/StorySlide';
const FollowingStory = () => {


    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSliderOpen, setIsSliderOpen] = useState(false);





    // fetching
    const token = sessionStorage.getItem("token");
    const myId = sessionStorage.getItem("myId");
    const [myData, setMyData] = useState({});
    const [ followingPosts , setFollowingPosts  ] = useState([])
    const [followingStory , setFollowingStory] = useState([])
    
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

                // following story
                fetch("http://localhost:5000/story/followingStory", {
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
                        setFollowingStory(data)
                    });

        }



    }, [myData])

  
    const settings = {
      arrows: false,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000, 
      beforeChange: (current, next) => setCurrentSlide(next),
    };
  

  
    const openSlider = (index) => {
      setCurrentSlide(index);
      setIsSliderOpen(true);
    };
  
    const closeSlider = () => {
      setIsSliderOpen(false);
    };
    return (
        <div className="all-story-con">
      {followingStory.map((story, index) => (
        <div key={index} onClick={() => openSlider(index)}  className='story-display-con' >
          <img className='story-photo' src={story.photo} alt="" />
        </div>
      ))}

      {isSliderOpen && (
        <div>
          <div className='right-con-overlay' onClick={closeSlider}></div>
          <div className='allStory-con-story'>
            <Slider {...settings} initialSlide={currentSlide}>
              {followingStory.map((story, index) => (
                <StorySlide key={index} story={story} closeSlider={closeSlider}/>
              ))}
            </Slider>
          </div>
        </div>
      )}
        </div>
    );
};


export default FollowingStory;