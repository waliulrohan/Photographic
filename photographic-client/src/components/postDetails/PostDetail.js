import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './postDetail.css'

import Text from '../../shared/Text'

// icons
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-hot-toast';
import ClearIcon from '@mui/icons-material/Clear';



import { CreateModal } from '../../App';
import ImageView from '../ImageView./ImageView';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
const PostDetail = ({ post, showComment, setShowComment , setMyPosts , myPosts , deleteId }) => {
    const navigate = useNavigate()
    const [thisPost, setThisPost] = useState({})
    const [isZoom , setIsZoom] = useState(false)
    useEffect(() => {
        setThisPost(post);
    }, [])


    const { _id, caption, postedBy, photo, likes, comments, createdAt } = thisPost;
    const timeStirng = new Date(createdAt);

    const [comment, setComment] = useState('')
    const { allPosts, setAllPosts } = useContext(CreateModal);

    const token = sessionStorage.getItem("token")

      // delete confirm
      const deleteConfirm = (postId) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this post.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        // delete post 

                            if (token) {
                                fetch(`https://photographic-server.onrender.com/post/delete/${postId}`, {
                                    method: "POST",
                                    headers: {
                                        'Authorization': `Bearer ${token}`,
                                        "Content-Type": "application/json",
                                    },
                                })
                                    .then(res => res.json())
                                    .then(data => {

                                        const newData = myPosts.filter(post => post._id !== data._id);
                                        setMyPosts(newData)
                                        setShowComment(false)
                                        toast.success("post deleted")

                                    });
                            }



                    }
                },
                {
                    label: 'No',
                    onClick: () => toast.error("You don't want to delete")
                }
            ]
        });
    };


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


                        setComment("");
                        const newData = myPosts.map(post => {
                            if (post._id === data._id) {
                                return data
                            } else {
                                return post
                            }
                        })
                        setMyPosts(newData)
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
                    const newData = myPosts.map(post => {
                        if (post._id === data._id) {
                            return data
                        } else {
                            return post
                        }
                    });
                    setMyPosts(newData)
                    setThisPost(data)
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
                    const newData = myPosts.map(post => {
                        if (post._id === data._id) {

                            return data
                        } else {
                            return post
                        }
                    });
                    setMyPosts(newData);
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
            {isZoom ?
             <ImageView url={photo} setIsZoom={setIsZoom}/>
             :
                <div className="close-modal">
                    <IconButton onClick={() => setShowComment(!showComment)} >
                        <ClearIcon style={{ fill: '#0072ea', fontSize: 30 }} />
                    </IconButton>
                </div>}
            {thisPost._id
                &&

                <div className="details-modal-container">
                    <div className="details-modal-detail">
                        <div  ref={commentsContainerRef}  className="detail-modal-all-comments" id="detail-modal-all-comments" style={{ borderBottom: "1px solid   #e7e7e7" }} >
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
                                                </div>                                   </div>)
                                })
                            }

                        </div>
                        <div className="details-modal-description">
                        <div className="card-comment" style={{ borderBottom: "1px solid #e7e7e7" , padding:"1px" }} >
                                <div className="card-frame" style={{borderRadius:"0px" , margin:"0px 5px"}}>
                                    <img
                                     onClick={()=> setIsZoom(true)}
                                    style={{ cursor: 'pointer' }}                                    
                                    src={photo}
                                    alt="........" className="card-dp" />
                                </div>

                                <input value={comment} className='commentInput' id='commentInput' type="text" placeholder='Add a comment...' name='comment' onChange={(e) => setComment(e.target.value)} />
                             { comment ?  <button className='card-comment-post' onClick={() => handleComment()}>Post</button>
                            :
                            <button className='card-comment-no-post'>Post</button>
                            }
                            </div>
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
                            <div className="card-description" style={{maxHeight:"30vh" , overflowX:'hidden' , overflowY:"scroll"}} >

                            <Text text={caption}></Text> 
                                <p className="time-stamp">{timeStirng.toLocaleDateString()}-{timeStirng.toLocaleTimeString()}</p>
                            </div>

                        </div>

                    </div>
                </div>

            }
      {deleteId && !isZoom &&
                <div className="delete-post">
                    <IconButton onClick={()=> deleteConfirm(deleteId)}>
                        <DeleteForeverRoundedIcon style={{ fill: '#0072ea', fontSize: 30 }} />
                    </IconButton>
                </div>}
        </div>
    );
};

export default PostDetail;