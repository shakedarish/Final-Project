import React from 'react';
import '../App.css';
import  Button  from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat' style={{ backgroundImage: 'url("/images/img-home.jpg")' }}>
        <h1 className='text-7xl font-bold text-white'>VidWizard</h1>
      <p className='text-white text-2xl m-5'>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          linkPath='/createForm'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          linkPath=''
        >
         EXAMPLES <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>

      
      

  );
}

export default HeroSection;