import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../../../actions/cart.action';

/**
* @author
* @function Price
**/

const Price = (props) => {

    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    const [cartItems, setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if (auth.userAuthenticate) {
            dispatch(getCartItems());
        }
    }, [auth.userAuthenticate]);


    return (
        <>
            <div className="rightPart">
                <div className="rightPartHeader">
                    Price
                </div>

                <div className="rightPartBody">

                    <div className="itemCount">
                        <div className="itemCountOne">
                            Total Item
                        </div>

                        <div className="itemCountTwo">
                            {
                                Object.keys(cartItems).reduce((qty, key) => {
                                    return qty + cartItems[key].qty;
                                }, 0)
                            }
                        </div>
                    </div>
{/* 
                    <div className="Delivery">
                        <div className="DeliveryOne">
                            Delivery Charge
                        </div>
                        <div className="DeliveryTwo">
                            Free
                        </div>
                    </div> */}


                    <div className="itemPrice">
                        <div className="itemPriceOne">
                            Total Price
                        </div>

                        <div className="itemPriceTwo">
                            {
                                Object.keys(cartItems).reduce((totalPrice, key) => {
                                    const { price, qty } = cartItems[key];
                                    return totalPrice + price * qty;
                                }, 0)
                            }
                        </div>
                    </div>

                </div>

            </div>
        </>
    )

}

export default Price