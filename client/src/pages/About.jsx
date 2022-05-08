import React from 'react'
import aboutImg from '../assets/images/about-img.jpg';

const About = () => {
  return (
    <section className='py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <img className='w-100' src={aboutImg} alt="about moto dang"/>
          </div>
          <div className='col-md-6'>
            <h1 className='mb-3'>About Us</h1>
            <p className='lead'>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
            </p>
            <p className='lead'>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
            </p>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default About