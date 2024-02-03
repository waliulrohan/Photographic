import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './postDetail.css'
// icons
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-hot-toast';

import { CreateModal } from '../../App';
const PostDetail = ({ post, showComment, setShowComment }) => {
    const [thisPost, setThisPost] = useState({})
    const [isDone, setIsDone] = useState(false)
    useEffect(() => {
        setThisPost(post);
        setIsDone(true);
    }, [])


    const { _id, caption, postedBy, photo, likes, comments } = thisPost;


    const [comment, setComment] = useState('')
    const { allPosts, setAllPosts } = useContext(CreateModal);

    const token = sessionStorage.getItem("token")



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


                        setComment("");
                        const newData = allPosts.map(post => {
                            if (post._id === data._id) {
                                return data
                            } else {
                                return post
                            }
                        })
                        setAllPosts(newData)
                        setThisPost(data);
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
                    setThisPost(data)
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
                    setAllPosts(newData);
                    setThisPost(data)
                });
        }

    }
    // always scroll to bottom in comments
    const commentsContainerRef = useRef(null);
    useLayoutEffect(() => {
        if (commentsContainerRef.current) {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
    }, [comments]);

    return (



        <div className="details-modal">
            <div className="close-modal">
                <IconButton onClick={() => setShowComment(!showComment)} >
                    <ClearIcon style={{ fill: '#0072ea', fontSize: 30 }} />
                </IconButton>
            </div>

            {thisPost._id
                &&

                <div className="details-modal-container">
                    <div className="details-modal-photo">
                        <img src={photo} alt="loading...." />
                    </div>
                    <div className="details-modal-detail">
                        <div className="details-header" style={{ borderBottom: "1px solid   #e7e7e7" }} >
                            <img
                                src={postedBy.photo}
                                alt="........" className="details-dp" />
                            <p className="detail-card-poster">{postedBy.name}</p>
                        </div>
                        <div  ref={commentsContainerRef}  className="detail-modal-all-comments" id="detail-modal-all-comments" style={{ borderBottom: "1px solid   #e7e7e7" }} >
                            {
                                comments.map(com => {
                                    return (
                                        <div className="comment-item">
                                            <img
                                                src={com.commenter.photo}
                                                alt="........" className="details-dp" />

                                            <p><span className="commenter">{com.commenter.name}</span>  <span className="comment-text">{com.comment}</span></p>
                                        </div>)
                                })
                            }

                        </div>
                        <div className="details-modal-description">
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
                                <button onClick={() => {
                                    handleComment()
                                }}>Post</button>
                            </div>
                        </div>

                    </div>
                </div>

            }

        </div>
    );
};

export default PostDetail;