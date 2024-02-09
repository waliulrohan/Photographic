/* eslint-disable no-cond-assign */
import React, { useContext, useEffect, useState } from 'react';

// icons
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';


import { CreateModal } from '../../App';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Card = ({ post }) => {
    const [showComment, setShowComment] = useState(false)
    const [comment, setComment] = useState('')
    const { allPosts, setAllPosts } = useContext(CreateModal);
    const { _id, caption, postedBy, photo, likes, comments } = post;
    const token = sessionStorage.getItem("token")
    const navigate = useNavigate();

    // add comment

    const handleComment = () => {

        if (comment) {
            if (token) {
                fetch("http://localhost:5000/post/comment", {
                    method: "put",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        _id: _id,
                        comment,
                    }),
                })
                    .then(res => res.json())
                    .then(data => {
                        if(!showComment){
                     toast.success("Comment posted.");
                        }

                        setComment("");
                        const newData = allPosts.map(post => {
                            if (post._id === data._id) {
                                return data
                            } else {
                                return post
                            }
                        })
                        setAllPosts(newData)
                  
                    });
            }
        } else {
            toast.error('Please write comment !')
        }
    }

    //like
    const handleLike = () => {
        if (token) {
            fetch("http://localhost:5000/post/like", {
                method: "put",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: _id,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    const newData = allPosts.map(post => {
                        if (post._id === data._id) {
                            return data
                        } else {
                            return post
                        }
                    });
                    setAllPosts(newData)

                });
        }

    }


    //unlike
    const handleUnlike = () => {
        if (token) {
            fetch("http://localhost:5000/post/unlike", {
                method: "put",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: _id,
                }),
            })
                .then(res => res.json())
                .then(data => {
                    const newData = allPosts.map(post => {
                        if (post._id === data._id) {

                            return data
                        } else {
                            return post
                        }
                    });
                    setAllPosts(newData)
                });
        }

    }
// always scroll to bottom in comments
useEffect(()=>{
    const messagesContainer = document.getElementById("all-comments");
  if (messagesContainer) {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

  }

},[comments])
    return (
        <div className='card-con'>
            <div className="card-header">
                <img
                style={{cursor:'pointer'}}
                 onClick={()=> navigate(`/otherProfile/${postedBy._id}`)}
                    src={postedBy.photo}
                    alt="........" className="card-dp" />
                <p    style={{cursor:'pointer'}}  onClick={()=> navigate(`/otherProfile/${postedBy._id}`)} className="card-poster">{postedBy.name}</p>
            </div>
            <div className="card-main">

                <div className="card-image">
                    <img className='card-image-photo' src={photo} alt="loading...." />

                </div>

                <div className="card-react">
                    {
                        likes.includes(sessionStorage.getItem("myId"))
                            ?
                            <div className="unlike" id='unlike'>
                                <IconButton onClick={() => handleUnlike()} >
                                    <FavoriteIcon style={{ fill: '#0072ea', fontSize: 30 }} />
                                </IconButton>
                                <p className="like-count">{likes.length}</p>
                            </div>
                            :
                            <div className="like" id='like'>
                                <IconButton onClick={() => handleLike()} >
                                    <FavoriteBorderIcon />
                                </IconButton>
                                <p className="like-count">{likes.length}</p>
                            </div>

                    }


                    <div className="comment">
                        <IconButton onClick={() => setShowComment(!showComment)}>
                            <ChatBubbleOutlineIcon />
                        </IconButton>
                        <p className="comment-count">{comments.length}</p>
                    </div>

                </div>

                <div className="card-description">

                    <p >{caption}</p>
                    <p className="time-stamp">2 days ago</p>
                </div>

            </div>
            <div className="card-comment">
                <div className="smile-icon">
                    <SentimentSatisfiedAltIcon></SentimentSatisfiedAltIcon>
                </div>

                <input value={comment} className='commentInput' id='commentInput' type="text" placeholder='Add a comment...' name='comment' onChange={(e) => setComment(e.target.value)} />
                <button onClick={() => handleComment()}>Post</button>

            </div>


            {
                showComment &&
                <div className="comment-modal">
                    <div className="close-modal">
                        <IconButton onClick={() => setShowComment(!showComment)} >
                            <ClearIcon  style={{ fill: '#0072ea', fontSize: 40 }}  />
                        </IconButton>
                    </div>
                    <div className="c-modal-container">
                        <div className="c-modal-photo">
                            <img src={photo} alt="loading...." />
                        </div>
                        <div className="c-modal-detail">
                            <div className="card-header" style={{ borderBottom: "1px solid   #e7e7e7" }} >
                                <img
                                    src={postedBy.photo}
                                    alt="........" className="card-dp" />
                                <p className="card-poster">{postedBy.name}</p>
                            </div>
                            <div className="all-comments" id="all-comments" style={{ borderBottom: "1px solid   #e7e7e7" }} >
                                {
                                    comments.map(com => { return(
                                        <div className="comment-item">
                                            <img
                                                src={com.commenter.photo}
                                                alt="........" className="card-dp" />

                                            <p><span className="commenter">{com.commenter.name}</span>  <span className="comment-text">{com.comment}</span></p>
                                        </div>)
                                    })
                                }

                            </div>
<div className="c-modal-description">
                                <div className="card-react" >
                                {
                                    likes.includes(sessionStorage.getItem("myId"))
                                        ?
                                        <div className="unlike" id='unlike'>
                                            <IconButton onClick={() => handleUnlike()} >
                                                <FavoriteIcon style={{ fill: '#0072ea', fontSize: 30 }} />
                                            </IconButton>
                                            <p className="like-count">{likes.length}</p>
                                        </div>
                                        :
                                        <div className="like" id='like'>
                                            <IconButton onClick={() => handleLike()} >
                                                <FavoriteBorderIcon />
                                            </IconButton>
                                            <p className="like-count">{likes.length}</p>
                                        </div>

                                }



                                <IconButton>
                                    <SendOutlinedIcon />
                                </IconButton>
                            </div>
                            <div className="card-description" style={{ borderBottom: "1px solid   #e7e7e7" }} >

                                <p >{caption}</p>
                                <p className="time-stamp">2 days ago</p>
                            </div>

                            <div className="card-comment" style={{ borderBottom: "1px solid   #e7e7e7" }} >
                                <div className="smile-icon">
                                    <SentimentSatisfiedAltIcon></SentimentSatisfiedAltIcon>
                                </div>

                                <input value={comment} className='commentInput' id='commentInput' type="text" placeholder='Add a comment...' name='comment' onChange={(e) => setComment(e.target.value)} />
                                <button onClick={() =>{ 
                                    handleComment()
                                }}>Post</button>
                            </div>
</div>

                        </div>
                    </div>
                </div>
            }


        </div>
    );
};

export default Card;