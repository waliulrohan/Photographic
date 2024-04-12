import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import Sidebar from './Sidebar';
import Card from './Card';
import Right from './Right';
import Navbar from '../../components/navbar/Navbar';
import { CreateModal } from '../../App';
import CardSkeletons from '../../components/loadingSkeletons/CardSkeletons';
import ClockLoader from 'react-spinners/ClockLoader'


const Home = () => {

  // title
  document.title = "Photographic-Home"

  const { allPosts, setAllPosts } = useContext(CreateModal);
  const [allCardsDiv, setAllCardsDiv] = useState(null);
  const [loading, setLoading] = useState(true)
  const [allStory, setAllStory] = useState([])
  const token = sessionStorage.getItem("token")
  let skip = 0;

  const fetchPosts = () => {
    const token = sessionStorage.getItem('token');
    console.log("setting  oooooooo function")

    if (token) {
      fetch(`https://photographic-server.onrender.com/post/allPosts?skip=${skip}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setLoading(false)
          setAllPosts(prevData => [...prevData, ...data])
        });
    }
  };

  const handleScroll = () => {
    if (!allCardsDiv) return;

    const { clientHeight, scrollTop, scrollHeight } = allCardsDiv;
    if (clientHeight + scrollTop >= scrollHeight) {
      setLoading(true)
      skip = skip + 10;
      fetchPosts();
    }

  };

  useEffect(() => {
    setAllCardsDiv(document.getElementById('all-cards'));
  }, []);

  useEffect(() => {
    if (!allCardsDiv) return;

    allCardsDiv.addEventListener('scroll', handleScroll);
    if(allPosts.length === 0){
      fetchPosts();
    }

    return () => {
      if (allCardsDiv) {
        allCardsDiv.removeEventListener('scroll', handleScroll);
      }
    };
  }, [allCardsDiv]);



  // fetching Stories
  useEffect(() => {
    if (token) {
      fetch('https://photographic-server.onrender.com/story/allStory', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAllStory(data)

        })
    }

  }, [])


  return (
    <div className='home-main'>
      <Navbar />
      <div className='home-con'>
        <Sidebar />

        <div id='all-cards' className='all-cards'>
          {allPosts ? (
            allPosts.map(post => <Card post={post} key={post._id} />)

          ) : (
            'loading....'
          )}
          {loading && <CardSkeletons />}
        </div>


        <Right stories={allStory} />
      </div>
    </div>
  );
};

export default Home;
