import React, { useContext, useEffect, useState } from 'react';

// icons
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';

import './home.css'

import { CreateModal } from '../../App';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ImageView from '../../components/ImageView./ImageView';
import Text from '../../shared/Text';


const Card = ({ post }) => {
    const {  followingPosts , setFollowingPosts , allPosts, setAllPosts  } = useContext(CreateModal);



    const [showComment, setShowComment] = useState(false)
    const [comment, setComment] = useState('')
    const { _id, caption, postedBy, photo, likes, comments , createdAt } = post;
    const token = sessionStorage.getItem("token")
    const navigate = useNavigate();
    const [ isZoom , setIsZoom] = useState(false)

    const timeStirng = new Date(createdAt);

    // add comment

    const handleComment = () => {
      setComment('')
        if (comment) {
            if (token) {
                fetch("https://photographic-server.onrender.com/post/comment", {
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
                        if (!showComment) {
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

                            // setting following Data
                            const newFollowingData = followingPosts.map(post => {
                                if (post._id === data._id) {
                                    return data
                                } else {
                                    return post
                                }
                            })
                            setFollowingPosts(newFollowingData)
    
                    });
            }
        } else {
            toast.error('Please write comment !')
        }
    }

    //like
    const handleLike = () => {
        if (token) {
            fetch("https://photographic-server.onrender.com/post/like", {
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

                            // setting following Data
                            const newFollowingData = followingPosts.map(post => {
                                if (post._id === data._id) {
                                    return data
                                } else {
                                    return post
                                }
                            })
                            setFollowingPosts(newFollowingData)
    
                });
        }

    }


    //unlike
    const handleUnlike = () => {
        if (token) {
            fetch("https://photographic-server.onrender.com/post/unlike", {
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

                            // setting following Data
                            const newFollowingData = followingPosts.map(post => {
                                if (post._id === data._id) {
                                    return data
                                } else {
                                    return post
                                }
                            })
                            setFollowingPosts(newFollowingData)
    
                });
        }

    }
    // always scroll to bottom in comments
    useEffect(() => {
        const messagesContainer = document.getElementById("all-comments");
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

        }

    }, [comments])
    return (
        <div className='card-con'>
            <div className="card-header">
                <div className="card-frame">
                    <img
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/otherProfile/${postedBy._id}`)}
                    src={postedBy.photo}
                    alt="........" className="card-dp" />
                </div>

                <p style={{ cursor: 'pointer' }} onClick={() => navigate(`/otherProfile/${postedBy._id}`)} className="card-poster">{postedBy.name}</p>
            </div>
            <div className="card-main">

                <div className="card-image">
                    <img onClick={(()=> setIsZoom(true))} className='card-image-photo' src={photo} alt="loading...." />
                    {isZoom && <ImageView url={photo} setIsZoom={setIsZoom} />}
                </div>

                <div className="card-react">
                    {
                        likes.includes(sessionStorage.getItem("myId"))
                            ?
                            <div className="unlike" id='unlike'>
                                <IconButton onClick={() => handleUnlike()} >
                                    <FavoriteIcon style={{ fill: '#0072ea'}} />
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

                <Text text={caption}></Text> 
                    <p className="time-stamp">{timeStirng.toLocaleDateString()}-{timeStirng.toLocaleTimeString()}</p>
                </div>

            </div>
            <div className="card-comment">
                <div className="smile-icon">
                    <SentimentSatisfiedAltIcon></SentimentSatisfiedAltIcon>
                </div>

                <input value={comment} className='commentInput' id='commentInput' type="text" placeholder='Add a comment...' name='comment' onChange={(e) => setComment(e.target.value)} />
                { comment ?  <button className='card-comment-post' onClick={() => handleComment()}>Post</button>
                            :
                            <button className='card-comment-no-post'>Post</button>
                 }
            </div>


            {
                showComment &&
                <div className="">
                    <div className="close-modal">
                        <IconButton onClick={() => setShowComment(!showComment)} >
                            <ClearIcon style={{ fill: '#0072ea', fontSize: 30 }} />
                        </IconButton>
                    </div>
                    <div className="c-modal-container">
                        <div className="c-modal-detail">
                            <div className="all-comments" id="all-comments" style={{ borderBottom: "1px solid   #e7e7e7" }} >
                                {
                                    comments.map(com => {
                                        return (
                                            <div className="comment-item">
                                                 <div className="card-frame">
                                                    <img
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => navigate(`/otherProfile/${com.commenter._id}`)}
                                                    src={com.commenter.photo}
                                                    alt="........" className="card-dp" />
                                                </div>

                                                <div className="comment-frame">
                                                     <p><span  onClick={() => navigate(`/otherProfile/${com.commenter._id}`)} className="commenter">{com.commenter.name}</span>  <span className="comment-text">{com.comment}</span></p>
                                                </div>                                            </div>)
                                    })
                                }

                            </div>
                            <div className="c-modal-description">
                            <div className="card-comment" style={{ borderBottom: "1px solid   #e7e7e7" }} >

                                    <input value={comment} className='commentInput' id='commentInput' type="text" placeholder='Add a comment...' name='comment' onChange={(e) => setComment(e.target.value)} />
                                    { comment ?
                                     <button className='card-comment-post' onClick={() => handleComment()}>Post</button>
                                    :
                                    <button className='card-comment-no-post'>Post</button>
                                    }
                                </div>
                                <div className="card-description" style={{maxHeight:"30vh" , overflowX:'hidden' , overflowY:"scroll"}} >

                                <Text text={caption}></Text> 
                                    <p className="time-stamp">{timeStirng.toLocaleDateString()}-{timeStirng.toLocaleTimeString()}</p>
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