import React from 'react';
import {Carousel} from 'react-bootstrap';
import banner from './images/Banner.png';
import chowmeen from './images/Chowmeen.jpg';
import thukpa from './images/Thukpa1.webp';
import momo from './images/momo.jpg';
import './style.css';

/**
* @author
* @function Banner
**/

const Banner = (props) => {

  return (
    <>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src={momo}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={thukpa}
            alt="Second slide"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img 
            className="d-block w-100"
            src={chowmeen}
            alt="Third slide"
          />

        </Carousel.Item>

        <Carousel.Item>
          <img 
            className="d-block w-100"
            src={banner}
            alt="Third slide"
          />

        </Carousel.Item>
      </Carousel>
    </>
  )

}

export default Banner