import React from 'react';
import './storySlide.css'


const StorySlide = ({story,closeSlider}) => {


    
    return (
        <div className="story-slide">
            <div className="slide-header">
            <button onClick={closeSlider}>Close</button>
            <h1>hiiiiiiiiiiiii</h1>
            </div>
            <div className="slide-photo">
              <img src={story.photo} alt="" />
            </div>


        </div>
    );
};

export default StorySlide;