import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../CartItem';
import { addToCart, getCartItems, removeCartItem } from '../../../actions/cart.action';

/**
* @author
* @function Items
**/

const Items = (props) => {

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

    const onQuantityIncrement = (_id, qty) => {
        const { name, price, img, category } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img, category }, 1));
    }

    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img, category } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img, category }, -1));
    }

    const onRemoveCartItem = (_id) => {
        dispatch(removeCartItem({ productId: _id }));
    };


    return (
        <>
            <div className="leftPart">

                <div className="cartHeader">
                    <div className="firstContent"><h5>My Cart</h5></div>
                </div>

            </div>

            {Object.keys(cartItems).map((key, index) => (
                <CartItem
                    key={index}
                    cartItem={cartItems[key]}
                    onQuantityInc={onQuantityIncrement}
                    onQuantityDec={onQuantityDecrement}
                    onRemoveCartItem={onRemoveCartItem}
                />
            ))}

            <div className="bottomBorder"></div>
        </>
    )

}

export default Items