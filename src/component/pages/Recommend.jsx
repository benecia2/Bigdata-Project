import React from 'react';
import '../styles/Recommend.css';
import startbtn from '../ui/startbtn.png';
import food from '../ui/food.png';
import shopping from '../ui/shopping.png';
import nature from '../ui/nature.png';
import culture from '../ui/culture.png';
import etc from '../ui/etc.png';

const Recommend = () => {
  return (
    <div className='recommendboard'>
      <div className='rcards'>
        <img src={food} alt='food lover'/>
        <img src={shopping} alt='shopping lover'/>
        <img src={nature} alt='nature lover'/>
        <img src={culture} alt='culture lover'/>
        <img src={etc} alt='etc'/>
      </div>
      <a href='/question'><img className='startbtn' src={startbtn} alt='start'/></a>
    </div>
  );
};


export default Recommend;