import React from 'react';
import './skeletons.css'

import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const CardSkeletons = () => {
const dummyArray =[0,0,0,0]
    return (
        <div>
                    {
            dummyArray.map((item,i)=>{
   return     <div className='card-con'>
            <div className="card-header" style={{height:"30px",backgroundColor:"rgb(252, 252, 252)"}}> 
            <div id="skeletonDp" className="glow" ></div>           
              <p className="time-stamp glow" id='card-skeleton-text' style={{width:"20%",height:"10px"}} ></p>
            </div>
            <div className="card-main">

                <div className="card-image glow" style={{height:"300px",backgroundColor:"#0000001c"}}>

                </div>

                <div className="card-react ">

                <div className="like" id='like'>
                                <IconButton  >
                                    <FavoriteBorderIcon />
                                </IconButton>
                            </div>



                    <div className="comment">
                        <IconButton >
                            <ChatBubbleOutlineIcon />
                        </IconButton>

                    </div>

                    <IconButton>
                        <SendOutlinedIcon />
                    </IconButton>
                </div>

                <div className="card-description">

                    <p id='card-skeleton-text' className='glow' ></p>
                    <p className="time-stamp glow" id='card-skeleton-text' style={{width:"20%",height:"10px"}} ></p>
                </div>

            </div>
            <div className="card-comment">
                <div className="smile-icon">
                    <SentimentSatisfiedAltIcon></SentimentSatisfiedAltIcon>
                </div>

                <input className='commentInput' id='commentInput' type="text" placeholder='Add a comment...' name='comment' />
                <button >Post</button>

            </div>





        </div>
            })
        }
        </div>


    );
};

export default CardSkeletons;