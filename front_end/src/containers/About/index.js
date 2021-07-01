import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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

            <div>
              Get Your Food
            </div>

            <img src={banner} alt="nothing"/>

            <div >
              <p>Food Delivery Service</p>
              <p style={{margin:'0'}}> GetYourFood is a food delivery service.</p>
              <p className="b">
                Where you can order your food from B-SUDDHA
                (@getyourfood production house)
                restaurant in lahan
              </p>

              <p style={{margin: '0'}}>We are located at:</p> 
              <p>
                Lahan-8.
                Infront of pashupati ma. bi.
                Nic Asia building, top floor.
              </p>
            </div>

          </div>

        </div>

        <Footer />
    </>
   )

 }

export default About