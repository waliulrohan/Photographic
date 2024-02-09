import logo from './images/photographicLogo.png';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authenticate from './components/authenticate/Authenticate';
import SignUp from './components/authenticate/SignUp';

import Login from './components/authenticate/Login';
import Home from './components/home/Home';
import { createContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import PostModal from './components/createPostModal/PostModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import PrivateOutlet from './components/privateRoute/PrivateOutlet';
import { Toaster } from 'react-hot-toast';
import MyProfile from './components/myProfile/MyProfile';
import OtherProfile from './components/otherProfile/OtherProfile';
import MyFollowing from './components/home/MyFollowing';
import Story from './components/story/Story';
import FollowingStory from './components/story/FollowingStory';
import AllStory from './components/story/AllStory';
import CreateStory from './components/createStory/CreateStory';
import Search from './components/search/Search'
import NotFound from './components/notFound/NotFound';



export const CreateModal = createContext();
function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [storyModal, setStoryModal] = useState(false)
  const [searchModal , setSearchModal] = useState(false)
  const [allPosts, setAllPosts] = useState([])

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <CreateModal.Provider value={{ modalIsOpen, setModalIsOpen, allPosts, setAllPosts, storyModal, setStoryModal ,searchModal , setSearchModal}}>
      <div className="App">
        <div><Toaster /></div>
     <ReactModal
          style={{
            overlay: {
              zIndex: '5000',
            },
            content: {
              padding: "0px",
              height: '90%',
            },
          }}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >
          <PostModal />
    </ReactModal>

    <ReactModal
          style={{
            overlay: {
              zIndex: '5000',
            },
            content: {
              padding: "0px",
              height: '90%',
              maxHeight: "90%",
            },
          }}
          isOpen={storyModal}
          onRequestClose={()=>setStoryModal(false)}
        >
            <IconButton onClick={()=>setStoryModal(false)}>
              <ArrowBackIcon />
            </IconButton>
          <CreateStory></CreateStory>
    </ReactModal>

        <BrowserRouter>

        <ReactModal
          style={{
            overlay: {
              zIndex: '5000',
            },
            content: {
              padding: "0px",
              height: '90%',
            },
          }}
          isOpen={searchModal}
          onRequestClose={ ()=> setSearchModal(false)}
        >
          <Search />
    </ReactModal>

          <Routes>
          <Route path='*' element={<NotFound />} />
            <Route path='/authenticate/*' element={<Authenticate></Authenticate>}>
              <Route path='signUp' element={<SignUp></SignUp>} />
              <Route path='login' element={<Login></Login>} />
              <Route path='' element={<Login></Login>} />
            </Route>
            <Route path="/" element={<PrivateOutlet />}>
              <Route path='/home' element={<Home />} />
              <Route path='following' element={<MyFollowing />} />
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<MyProfile />} />
              <Route path='/otherProfile/:id' element={<OtherProfile />} />
              <Route path='/story' element={<Story />} >
                <Route path='followingStory' element={<FollowingStory />} />
                <Route path='allStory' element={<AllStory />} />
                <Route path='' element={<FollowingStory />} />
              </Route>

            </Route>


          </Routes>
        </BrowserRouter>

      </div>
    </CreateModal.Provider>

  );
}

export default App;
