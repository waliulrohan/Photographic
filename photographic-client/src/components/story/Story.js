import React, { useEffect, useState } from 'react';
import Right from '../home/Right';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

import './story.css'
const Story = () => {
    const navigate = useNavigate();
    const [isAllStory, setIsAllStory] = useState(false)
    const [isAllTab, setIsAllTab] = useState(false)



    useEffect(() => {
        if (isAllStory) {
            navigate('allStory')
        }
        else if (!isAllStory) {
            navigate('followingStory')
        }

    }, [isAllStory])

    return (
        <div >
            <Navbar />
<div className="story-error">
    <h1>Go to <span className='story-homepage-button' onClick={()=>navigate("/home")}>homepage</span> or small screen to see  story</h1>
</div>
            <div className="story-con" style={{ marginTop: "60px" }}>

                <div className="story-tab">
                    <button className={isAllTab ? "story-tablinks" : "story-tablinks-active"} onClick={() => {
                        setIsAllStory(false);
                        setIsAllTab(false)
                    }}>Following</button>
                    <button className={isAllTab ? "story-tablinks-active" : "story-tablinks"} onClick={() => {
                        setIsAllTab(true);
                        setIsAllStory(true);
                    }}>All</button>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default Story;