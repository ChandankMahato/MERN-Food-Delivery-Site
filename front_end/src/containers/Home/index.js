import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import Product from '../../components/Product';
import { isUserLoggedIn } from '../../actions';

/**
* @author
* @function Home
**/

const Home = (props) => {

  useEffect(() => {
    isUserLoggedIn();
  }, [])

  return(
    <>
        <Header />
        <Banner />
        <Product />
    </>
   )

 }

export default Home