import React from 'react';
import './skeletons.css'

const StorySkeleton = () => {
   const fakeStory =[0,0,0,0,0,0]
    return (
        <div className="all-story-con">
      {fakeStory.map((e , index) => (
        <div key={index}  className='story-display-con glow' >
          
        </div>
      ))}

        </div>
    );
};

export default StorySkeleton;