import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StorySlide from '../storySlide/StorySlide';

const Right = ({stories}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const settings = {
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
    <div className='right-con'>
      {stories.map((story, index) => (
        <div key={index} onClick={() => openSlider(index)}>
          <img className='story-photo' src={story.photo} alt="" />
        </div>
      ))}

      {isSliderOpen && (
        <div>
          <div className='right-con-overlay' onClick={closeSlider}></div>
          <div className='right-con-story'>
            <Slider {...settings} initialSlide={currentSlide}>
              {stories.map((story, index) => (
                <StorySlide key={index} story={story} closeSlider={closeSlider}/>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Right;
