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
            <h3>Cart Is Empty</h3>
            <p>It Seems like you Have not added item to cart.</p>
            <h3 className="add" onClick={() => history.push('/') }>Add Items</h3>
          </div> 
        :<>
          <Items/>
          <Price/>
          <Bbuttons/>
        </>
      }
        {Object.keys(cart.cartItems).length === 0 ? null : 
        <div className="addMore">
          <button onClick={() => history.push('/')}>Add More Item</button>
        </div>}
    </div>

      <Footer/>
    </>
   )

 }

export default Cart
