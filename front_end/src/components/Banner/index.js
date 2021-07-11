import React, { useEffect } from 'react';
import {Carousel} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {getAllBanner} from '../../actions';
import { generatePublicUrl } from '../../urlConfig';
import './style.css';

/**
* @author
* @function Banner
**/

const Banner = (props) => {

  const dispatch = useDispatch();
  const banner = useSelector(state => state.banner);

  useEffect(() => {
    dispatch(getAllBanner());
  },[]);

  return (
    <>
      <Carousel>
      {
          banner.banners.map((banner, index) => (
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src={generatePublicUrl(banner.bannerImage)}
                alt="slides"
              />
              </Carousel.Item>
          ))
        }
      </Carousel>
    </>
  )

}

export default Banner