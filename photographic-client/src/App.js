import logo from './images/photographicLogo.png';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authenticate from './pages/authenticate/Authenticate';
import SignUp from './pages/authenticate/SignUp';

import Login from './pages/authenticate/Login';
import Home from './pages/home/Home';
import { createContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import PostModal from './components/createPostModal/PostModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import PrivateOutlet from './components/privateRoute/PrivateOutlet';
import { Toaster } from 'react-hot-toast';
import MyProfile from './pages/myProfile/MyProfile';
import OtherProfile from './pages/otherProfile/OtherProfile';
import MyFollowing from './pages/home/MyFollowing';
import Story from './pages/story/Story';
import FollowingStory from './pages/story/FollowingStory';
import AllStory from './pages/story/AllStory';
import CreateStory from './components/createStory/CreateStory';
import Search from './components/search/Search'
import NotFound from './components/notFound/NotFound';



export const CreateModal = createContext();
function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [storyModal, setStoryModal] = useState(false)
  const [searchModal , setSearchModal] = useState(false)
  const [allPosts, setAllPosts] = useState([])
  const [ followingPosts , setFollowingPosts  ] = useState([])
  const [myData, setMyData] = useState({});
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <CreateModal.Provider value={{myData, setMyData, modalIsOpen, setModalIsOpen, allPosts, setAllPosts, storyModal, setStoryModal ,searchModal , setSearchModal ,  followingPosts , setFollowingPosts }}>
      <div className="App">
        <div><Toaster /></div>
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
          <PostModal />
          <CreateStory />
        </BrowserRouter>

      </div>
    </CreateModal.Provider>

  );
}

export default App;
