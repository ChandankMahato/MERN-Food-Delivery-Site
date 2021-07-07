import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './style.css';
import { generatePublicUrl } from '../../../urlConfig';
import { Slide, toast } from 'react-toastify';


/**
* @author
* @function CartItem
**/

const CartItem = (props) => {

    const [qty, setQty] = useState(props.cartItem.qty);
    const {_id, name, price, img, category} = props.cartItem;

    const onQuantityIncrement = () => {
        setQty(qty + 1);
        props.onQuantityInc(_id, qty + 1);
    };

    const onQuantityDecrement = () => {
        if(qty <= 1) return;
        setQty(qty - 1);
        props.onQuantityDec(_id, qty - 1);
    };

    const Info = () => {
      toast.success('Product Saved To Your Cart.', {position: 'top-left', transition:Slide});
    }

  return (
    <>
          <div>
            {
              <div>
                <Row className="cartItems">

                  <Col md="2" className="cartProImgContainer">
                    <img src={generatePublicUrl(img)} alt="nothing" />
                  </Col>

                  <Col md="6" className="cartProNameContainer">
                    {name}
                    <h5>Rs. {price}</h5>
                  </Col>

                  <Col md="4"className="cartProDeliveryContainer">
                   Delivery in 30 minutes
                  </Col>

                </Row>

                <Row className="cartItemsDetails">
                  
                  <Col md="2" className="quantityControl" >
                    <button onClick={onQuantityDecrement}>-</button>
                    <input value={qty} readOnly/>
                    <button onClick={onQuantityIncrement}>+</button>
                  </Col>

                  <Col md="6">
                    <button className="cartActionBtn" onClick={Info}>Save for later</button>
                    <button className="cartActionBtn" onClick={() => props.onRemoveCartItem(_id)}>Remove</button>
                  </Col>

                </Row>
              </div>
            }
            
          </div>
    </>
  )

}

export default CartItem;