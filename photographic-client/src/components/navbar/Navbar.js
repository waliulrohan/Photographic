import React, { useContext, useEffect, useState } from 'react';
import logo from '../../images/photographicLogo.png'
import './navbar.css'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

import { IconButton } from '@mui/material';
import { MoreVertOutlined } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CreateModal } from '../../App';
import { useNavigate } from 'react-router-dom';

import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import Diversity1Icon from '@mui/icons-material/Diversity1';
const Navbar = () => {
  const navigate = useNavigate();
  const {setStoryModal, setModalIsOpen, setSearchModal } = useContext(CreateModal); 
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  const [myDp, setMyDp] = useState('')
  useEffect(() => {
    setMyDp(sessionStorage.getItem("myDp"))
  }, [])

  // functions for modal 
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='navbar-con'>
      <img src={logo} alt="" className="navbar-logo" onClick={() => navigate("/")} style={{ cursor: 'pointer' }} />
      <div className="navbar-spacer"></div>
      <div className="navbar-icon">
        <IconButton onClick={() => toggleDrawer()}>
          <MoreVertOutlined style={{ color: 'black' }} />
        </IconButton>
      </div>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='left'
        className='bla bla bla'
        style={{
          width:"200px"
        }
        }
      >
        <div className='navbar-drawer'>

          <div className="sidebar" style={{ border: "0px" }}>
            <img src={logo} alt="logo...." className="sidebar-logo" onClick={() => navigate("/")} style={{ cursor: 'pointer' }} />
            <div className="sidebar-nav">
              <IconButton onClick={() => {
                navigate('/home');
                setIsOpen(false);
              }}>
                <HomeIcon style={{ color: 'black' }} /> <span className='sidebar-nav-link'>Home</span>
              </IconButton >

              <IconButton onClick={() => {
                setIsOpen(false)
                setSearchModal(true)
              }}>
                <SearchIcon style={{ color: 'black' }} /> <span className='sidebar-nav-link'>Search</span>
              </IconButton>

              <IconButton onClick={() => {
                openModal();
                setIsOpen(false);
              }}>
                <AddCircleOutlineIcon style={{ color: 'black' }} /> <span className='sidebar-nav-link'>Create</span>
              </IconButton>
              <IconButton onClick={() => {
                setStoryModal(true);
                setIsOpen(false);
               }}>
                <AddPhotoAlternateTwoToneIcon style={{ color: 'black' }} /> <span className='sidebar-nav-link'>Add Story</span>
              </IconButton>
              
              <div className="story-button">
                <IconButton onClick={() => {
                navigate('/story');
                setIsOpen(false);
              }}>
                <CropOriginalIcon style={{ color: 'black' }} /> <span className='sidebar-nav-link'>Story</span>
              </IconButton>
              </div>




              <IconButton onClick={() => navigate('/following')} >
              <Diversity1Icon  style={{ color: 'black' }} /> <span className='sidebar-nav-link'>Following </span>
              </IconButton>


              <div className="profile-btn" onClick={() => navigate('/profile')}>
                <div className="profile-btn-image">
                  <img src={myDp} alt="...." />
                </div>

                <p>Profile</p>
              </div>
            </div>
          </div>
        </div>


      </Drawer>

    </div>
  );
};

export default Navbar;