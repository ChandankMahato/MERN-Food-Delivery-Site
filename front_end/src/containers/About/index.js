import React from 'react';
import Header from '../../components/Header';
import banner from './images/Banner.png';
import './style.css';

/**
* @author
* @function About
**/

const About = (props) => {
  return(
    <>
        <Header />

        <div className="about">

          <div className="aboutGetYourFood">

          <h1>getyourfood</h1>
            <img src={banner} alt="nothing"/>

            <div >
              <p>Food Delivery Service</p>
              <p> GetYourFood is a food delivery service.</p>
              <p className="b">
                Where you can order your food from B-SUDDHA
                (@getyourfood production house)
                restaurant in lahan
              </p>

              <p>We are located at:</p> 
              <p>
                Lahan-8.
                Infront of pashupati ma. bi.
                Nic Asia building, top floor.
              </p>
            </div>

          </div>

        </div>
    </>
   )

 }

export default About