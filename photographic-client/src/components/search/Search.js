import React, { useContext, useState } from 'react';
import { CreateModal } from '../../App';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './search.css'
import { useNavigate } from 'react-router-dom';
const Search = () => {
    const {setSearchModal} = useContext(CreateModal)
    const [search , setSearch] = useState('');
    const token = sessionStorage.getItem("token")
    const [users , setUsers] = useState([])
    const navigate = useNavigate()

    // search 
const searchUser= (value)=>{
    setSearch(value)
    if (token , search) {
        fetch(`http://localhost:5000/user/search/searchUser`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: search }),
        })
            .then(res => res.json())
            .then(data => {
                if(data.users){
                    setUsers(data.users) 
                }else{
                    setUsers([])

                }

            });
    }
}
    
    return (
        <div className='search-con'>
            <div className="modal-closing-button">
            <IconButton onClick={()=>setSearchModal(false)}>
              <ArrowBackIcon />
            </IconButton>
            </div>
            <div className="search-input">
            <input value={search} className='search-field' type="text" placeholder='search' name='search' onChange={(e)=> searchUser(e.target.value)} />
            </div>
            <div className="search-result">
             {
                users.length > 0 ?
                (
                    users.map(user=>(
                        <div className="searchItem"   onClick={()=>{
                             navigate(`/otherProfile/${user._id}`);
                             setSearchModal(false);

                        }}>
                            <div className="searchItem-photo">
                                <div className="story-dp-frame">
                                     <img src={user.photo} alt="" className="story-dp" />
                                </div>
                            </div>
                            <div className="searchItem-description">
                                <p className="searchItem-name">{user.name}</p>
                                <p className="searchItem-email">{user.email}</p>
                            </div>
                        </div>

                    ))
                )
                :
                <p className="searchItem-name">result will appear here</p>
             }
            </div>
        </div>
    );
};

export default Search;