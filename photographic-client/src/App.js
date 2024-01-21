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



export const CreateModal = createContext();
function App() {



//   useEffect(() => {
//     const myId = sessionStorage.getItem("myId");
//     const token = sessionStorage.getItem("token")
//     if (myId && token) {
//         fetch(`http://localhost:5000/user/${myId}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 token: token,
//             }),
//         })
//             .then(res => res.json())
//             .then(data => {

//                 sessionStorage.setItem("myDp",data.user[0].photo)
//             });
//     }
// }, [])
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [allPosts , setAllPosts] = useState([])
  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <CreateModal.Provider value={{ modalIsOpen, setModalIsOpen ,allPosts, setAllPosts }}>
      <div className="App">
      <div><Toaster/></div>
        <ReactModal
          style={{
            overlay: {

              zIndex: '5000',
            },
            content: {
              padding: "0px",
              height:'90%',
            },
          }}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        >

             <IconButton  onClick={closeModal}>
                <ArrowBackIcon />
             </IconButton>

          <PostModal />

        </ReactModal>

        <BrowserRouter>
          <Routes>
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

            </Route>


          </Routes>
        </BrowserRouter>

      </div>
    </CreateModal.Provider>

  );
}

export default App;
