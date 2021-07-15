import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSelector } from 'react-redux';
import './style.css'

/**
* @author
* @function Order
**/

const Order = (props) => {

  const userOrder = useSelector(state => state.userOrder);
  const auth = useSelector(state => state.auth);
  const [selectedDate, setSelectedDate] = useState(Date());

  const showDate = (date) => {
    var dateObj =new Date(date);
    var dateString = dateObj.toString();
    var output = dateString.substring(0, 25);
    return(output);
  }

  const showTotalContribution = () => {
    var total =0 ;
    for(var i = 0 ; i< userOrder.userOrders.length; i++){
      total += userOrder.userOrders[i].totalAmount;
    }
    var contribution = total/100;
    return contribution;
  }

  return(
    <>
        <Header/>
        <div className="BillContainer">
            <div style={{textAlign:'center'}}>Welcome to getyourfood, {auth.user.fullName}</div>
            <div style={{textAlign: 'Center'}}>Thank You for your Contribution</div>
            <div style={{textAlign: 'center'}}>Contribution Point: {showTotalContribution()}</div>
            <div style={{textAlign:'Center'}}>Show Order History as of:</div>
            <form style={{textAlign:'center'}}>
                <input type="date" name="order" min="2021-01-01" onChange={(e)=> setSelectedDate(e.target.value)} max="2026-01-01" required/>
                <span className="validity"></span>
            </form>
              {
                userOrder.userOrders.map((order,index) => (
                  (
                      new Date(order.createdAt).toDateString() === new Date(selectedDate).toString().substring(0,15)? 
                      <div className="Bill">
                      <div className="BillNo">
                          Bill No: {index+ 1}
                      </div>

                      <div className="BIllItem">
                        <>
                          <div className="productsQtyBill">
                            <span className="productsHeadingBill">Products Name</span>
                            <span className="QtyHeadingBill">Qty</span>
                            <span className="priceHeadingBill">Price</span>
                          </div>

                          {order.items.map((item, index) => (
                            
                            <div className="itemAndQtyBill">
                            
                              <div className="insideKotItemBill">
                                  {item.productId.name} 
                              </div>
                              <div className="priceInsideKotItemBill">
                                {item.productId.price}
                              </div>
                              <div className="qtyInsideKotItemBill">
                                  {item.purchasedQty}
                              </div>
                            </div>
                          ))}
                        </>
                      </div>

                      <div className="customerDetailsHeading">
                        <span>Your Details</span>
                      </div>

                      <div className="customerDetails">
                        <div className="details">
                          <div className="title"><span >Name:</span>&nbsp;&nbsp;{order.address_name}</div>
                          <div className="title"><span >Mobile:</span>&nbsp;&nbsp;{order.address_mobileNumber} / {order.address_alternatePhone}</div>
                          <div className="title"><span> Address:</span>&nbsp;&nbsp;{order.address_address},&nbsp;{order.address_locality},&nbsp;{order.address_landmark}</div>
                          <div className="title"><span >Amount:</span>&nbsp;&nbsp;{order.totalAmount}</div>
                        </div>
                      </div>

                      <div className="status">
                        <div className="UserorderStatus">Order Status</div>
                        <div className="currentStatus">
                          {order.orderStatus[4].isCompleted? 'Delivered' :
                          order.orderStatus[3].isCompleted? 'On The Way':
                          order.orderStatus[2].isCompleted? 'Packed':
                          order.orderStatus[1].isCompleted? 'Cooked':
                          order.orderStatus[0].isCompleted? 'Ordered': null}
                        </div>
                      </div>

                      <div className="BillTime">
                            {showDate(order.createdAt)}
                      </div>

                    </div> : null
                  )
                      ))
                    }
              </div>
        <Footer/>
    </>
   )

 }

export default Order