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
  };

  useEffect(() => {
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

        <Right />
      </div>
    </div>
  );
};

export default Home;
