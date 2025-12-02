import React from 'react';
import Navbar from '../pages/Navbar';
import MainSlide from './MainSlide';
import Steps from './Steps';
import Features from './Features';
import Download from './Download';
import Fotter from '../../../Footer/Footer';
import { useEffect } from 'react';

const Home = ({ history }) => {
  // useEffect(() => {
  //   window.history.pushState(null, document.title, window.location.href);

  //   window.addEventListener('popstate', function (event) {
  //     window.history.pushState(null, document.title, window.location.href);
  //   });
  // }, [history]);
  // const storedUserId = localStorage.getItem('userId');

  // useEffect(() => {
  //   console.log("storage : " + storedUserId);
  // }, [])

  return (
    <div>
      <Navbar style={{ zIndex: 1 }} />
      <MainSlide style={{ zIndex: 2 }} />
      {/* <div style={{ margin: '5vh 0', zIndex: 3 }}></div> */}

      <Steps style={{ zIndex: 4 }} />
      {/* <div style={{ margin: '10vh 0', zIndex: 5 }}></div> */}

      <Features style={{ zIndex: 12 }} />
      {/* <div style={{ margin: '5vh 0', zIndex: 12 }}></div> */}



      <Fotter style={{ zIndex: 10 }} />
    </div>
  );
};

export default Home;
