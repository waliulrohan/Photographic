import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import Sidebar from './Sidebar';
import Card from './Card';
import Right from './Right';
import Navbar from '../navbar/Navbar';
import { CreateModal } from '../../App';
import CardSkeletons from '../loadingSkeletons/CardSkeletons';
import ClockLoader from 'react-spinners/ClockLoader'


const Home = () => {
  const { allPosts, setAllPosts } = useContext(CreateModal);
  const [allCardsDiv, setAllCardsDiv] = useState(null);
  const [loading,setLoading] = useState(true)
  let skip = 0;

  const fetchPosts = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch(`http://localhost:5000/post/allPosts?skip=${skip}`)
        .then(res => res.json())
        .then(data =>{
          setLoading(false)
           setAllPosts(prevData => [...prevData, ...data])
          });
    }
  };

  const handleScroll = () => {
    if (!allCardsDiv) return;

    const { clientHeight, scrollTop, scrollHeight } = allCardsDiv;
    if (clientHeight + scrollTop >= scrollHeight) {
      console.log('scrolled to bottom');
      skip = skip + 3;
      fetchPosts();
    }
    console.log('scrolled triggerd');
  };

  useEffect(() => {
    console.log('scrolled triggerd');
    setAllPosts([])
    setAllCardsDiv(document.getElementById('all-cards'));
  }, []);

  useEffect(() => {
    if (!allCardsDiv) return;

    allCardsDiv.addEventListener('scroll', handleScroll);
    fetchPosts();

    return () => {
      if (allCardsDiv) {
        allCardsDiv.removeEventListener('scroll', handleScroll);
      }
    };
  }, [allCardsDiv]);


  const fakeStories = [
    { photo: 'https://yt3.ggpht.com/bcnSPX2PVmGdp_u0_3N2_L2nLXojM9HFyzbcg9UGPv3l9B9TZSDsDQvFoOM3Mnbz9M4xM_Oa8Is=s48-c-k-c0x00ffffff-no-rj' },
    { photo: 'https://thumbs.dreamstime.com/b/handsome-guy-being-bored-talking-stranger-random-staff-yawning-cover-opened-mouth-fist-squinting-tired-standing-fatigue-178777560.jpg' },
    { photo: 'https://res.cloudinary.com/dlaikb0id/image/upload/v1705915715/fotor-ai-20231226222744_jnchnr.jpg' },
    { photo: 'https://res.cloudinary.com/dlaikb0id/image/upload/v1705917126/Cropped_Image_1000_ab9gql.webp' },   
    { photo: 'https://res.cloudinary.com/dlaikb0id/image/upload/v1706182498/Screen_Shot_2023-10-28_at_11.55.00_vxoujl.png' },
  ];

  return (
    <div className='home-main'>
      <Navbar />
      <div className='home-con'>
        <Sidebar />
        {loading?
         <div id='all-cards' className='all-cards'>
                 <CardSkeletons />
        </div>
        :
        <div id='all-cards' className='all-cards'>
          {allPosts ? (
            allPosts.map(post => <Card post={post} key={post._id} />)

          ) : (
            'loading....'
          )}
     <ClockLoader
  color="#36d7b7"
  size={50}
  speedMultiplier={4}
/>
          <div className='invisible-space'>
            <h1>space</h1>
          </div>
        </div>
      }

        <Right stories={fakeStories}/>
      </div>
    </div>
  );
};

export default Home;
