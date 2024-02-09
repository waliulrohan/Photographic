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

  // title
document.title = "Photographic-Home"

  const { allPosts, setAllPosts } = useContext(CreateModal);
  const [allCardsDiv, setAllCardsDiv] = useState(null);
  const [loading,setLoading] = useState(true)
  const [allStory,setAllStory] = useState([])
  const token = sessionStorage.getItem("token")
  let skip = 0;

  const fetchPosts = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      fetch(`https://photographic-server.onrender.com/post/allPosts?skip=${skip}`)
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
      skip = skip + 10;
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
// fetching Stories
useEffect(()=>{
  if(token){
      fetch('https://photographic-server.onrender.com/story/allStory', {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
})
    .then((res) => res.json())
    .then((data) => {
console.log(data);
            setAllStory(data)
    
    })
  }

},[])


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

          <div className="clock-loader">
                <ClockLoader
                color="#0072ea"
                size={50}
                speedMultiplier={4}
                />
          </div>

          <div className='invisible-space'>
            <h1>space</h1>
          </div>
        </div>
      }

        <Right stories={allStory}/>
      </div>
    </div>
  );
};

export default Home;
