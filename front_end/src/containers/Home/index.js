import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import Product from '../../components/Product';
import Footer from '../../components/Footer';
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
        <Footer />
    </>
   )

 }

export default Home