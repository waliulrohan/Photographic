import React from 'react';
import './storySlide.css'
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';

const StorySlide = ({story,closeSlider}) => {
    const navigate = useNavigate();
const {name,photo, _id}  = story.postedBy;
    console.log(story);
    return (
        <div className="story-slide">
            <div className="slide-header"  >
                <div className="story-dp-frame"  onClick={()=> navigate(`/otherProfile/${_id}`)}>
                    <img src={photo} alt="" className="story-dp" />
                </div>
                <div  onClick={()=> navigate(`/otherProfile/${_id}`)}>
                                    <p className="story-poster">{name}</p>
                </div>

                <div className="close-story-modal" >
                    <IconButton onClick={closeSlider} >
                        <ClearIcon style={{ fill: '#0072ea', fontSize: 30 }} />
                    </IconButton>
                </div>
    
            </div>
            <div className="slide-photo">
              <img src={story.photo} alt="" />
            </div>


        </div>
    );
};

export default StorySlide;