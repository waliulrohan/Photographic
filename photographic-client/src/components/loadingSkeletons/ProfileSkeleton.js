import React from 'react';
import './skeletons.css'
const ProfileSkeleton = () => {
    const fakePhoto=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    return (
 
                <div className="all-cards profile">
                    <div className="profile-main">
                        <div className="profile-pic">
                            <div className="profile-pic-frame glow">
                                
                            </div>

                        </div>
                        <div className="profile-details">

                        <p id='card-skeleton-text'  className='glow' ></p>
                        <p className="time-stamp glow" id='card-skeleton-text' style={{width:"20%",height:"10px"}} ></p>
                                 <div className="profile-skeleton-follow">
                                 <p className="time-stamp glow" id='card-skeleton-text' style={{width:"10%",height:"15px"}} ></p>
                                 <p className="time-stamp glow" id='card-skeleton-text' style={{width:"10%",height:"15px"}} ></p>
                                 <p className="time-stamp glow" id='card-skeleton-text' style={{width:"10%",height:"15px"}} ></p>
                                 </div>
                                 <button  className='edit-profile glow'></button>
                        </div>
                    </div>

                    <div className="profile-gallery">
                   

                {
                    fakePhoto.map((data,i)=>    <div key={i} className="photo-skeleton"></div>)
                }




                      
                    </div>


                    <div className="invisible-space">
                        <h1>space</h1>
                    </div>
                </div>



    );
};

export default ProfileSkeleton;