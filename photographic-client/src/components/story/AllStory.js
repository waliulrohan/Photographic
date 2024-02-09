import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StorySlide from '../storySlide/StorySlide';

const AllStory = () => {


    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const [allStory,setAllStory] = useState([])
    const token = sessionStorage.getItem("token")
  
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
    // fetching Stories
useEffect(()=>{
  if(token){
      fetch('https://photographic-server.onrender.com/story/allStory', {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
})
    .then((res) => res.json())
    .then((data) => {
console.log(data);
            setAllStory(data)
    
    })
  }

},[])


  
    const openSlider = (index) => {
      setCurrentSlide(index);
      setIsSliderOpen(true);
    };
  
    const closeSlider = () => {
      setIsSliderOpen(false);
    };

    if (allStory.length === 0) {
      return(
        <div className="no-story">
        <p>Stories will appear here</p>
      </div>
      )
    } 

    return (
        <div className="all-story-con">
      {allStory.map((story, index) => (
        <div key={index} onClick={() => openSlider(index)} className='story-display-con'>
          <img className='story-photo' src={story.photo} alt="" />
        </div>
      ))}

      {isSliderOpen && (
        <div>
          <div className='right-con-overlay' onClick={closeSlider}></div>
          <div className='allStory-con-story'>
            <Slider {...settings} initialSlide={currentSlide}>
              {allStory.map((story, index) => (
                <StorySlide key={index} story={story} closeSlider={closeSlider}/>
              ))}
            </Slider>
          </div>
        </div>
      )}
        </div>
    );
};

export default AllStory;