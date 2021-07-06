import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Bbuttons from './Button/button';
import Price from './Price/price';
import Items from './Item/items';
import './style.css';
import {useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCartItems } from '../../actions';

/**
* @author
* @function Cart
**/

const Cart = (props) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  },[]);

  let history = useHistory();
  const cart = useSelector(state => state.cart);

  return(
    <>
    <Header />

    <div className="cartItemContainer">
      {Object.keys(cart.cartItems).length === 0
        ?<div className="emptyCart">
            <h1>Cart Is Empty</h1>
            <p>It Seems like you Have not added item to cart.</p>
            <h1 className="add" onClick={() => history.push('/') }>Add Items</h1>
          </div> 
        :<>
          <Items/>
          <Price/>
          <Bbuttons/>
        </>
      }
    </div>

      <Footer/>
    </>
   )

 }

export default Cart
