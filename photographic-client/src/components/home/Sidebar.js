import React, { useContext, useEffect, useState } from 'react';
import logo from '../../images/photographicLogo.png'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from '@mui/material';
import { CreateModal } from '../../App';
import { useNavigate } from 'react-router-dom';


import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import Diversity1Icon from '@mui/icons-material/Diversity1';

const Sidebar = () => {
  const navigate = useNavigate();
    const {setStoryModal, setModalIsOpen, setSearchModal } = useContext(CreateModal); 

    const [myDp,setMyDp]=useState('')
useEffect(()=>{
  setMyDp(sessionStorage.getItem("myDp"))
},[])

    // functions for modal 
    const openModal = () => {
        setModalIsOpen(true);
      };

    return (
        <div className='sidebar-con'>

            <div className="sidebar">
               <img src={logo} alt="logo...." className="sidebar-logo" onClick={()=> navigate('/')} style={{cursor:'pointer'}}/>
                <div className="sidebar-nav">
                  <IconButton  onClick={()=> navigate('/home')}>
                      <HomeIcon  style={{ color: 'black'}}  /> <span className='sidebar-nav-link'>Home</span>
                  </IconButton> 

                  <IconButton onClick={()=>setSearchModal(true)}>
                     <SearchIcon style={{ color: 'black'}}   /> <span className='sidebar-nav-link'>Search</span>
                  </IconButton>

                  <IconButton  onClick={()=>{
                    openModal();

                }} >
                     <AddCircleOutlineIcon  style={{ color: 'black'}}  /> <span className='sidebar-nav-link'>Create</span>
                  </IconButton>

                  <IconButton onClick={() => { 
                        setStoryModal(true)
                  }}>
                    <AddPhotoAlternateTwoToneIcon style={{ color: 'black' }} /> <span className='sidebar-nav-link'>Add Story</span>
                  </IconButton>
 

                  <IconButton  onClick={()=> navigate('/following')} >
                     <Diversity1Icon  style={{ color: 'black'}}  /> <span className='sidebar-nav-link'>Following </span>
                  </IconButton>

                  <div className="profile-btn"  onClick={()=> navigate('/profile')}>
                    <div className="profile-btn-image">
                       <img src={myDp} alt="...." />
                    </div>

                    <p>Profile</p>
                  </div>
                </div>
            </div>

        </div>
    );
};

export default Sidebar;