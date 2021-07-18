import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {adminUpdateOrder} from '../../../actions'
import Layout from '../../../components/Admin/Layout'
import './style.css';

/**
* @author
* @function KOT
**/

const KOT = (props) => {
    
  const order = useSelector(state => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  
  const showDate = (date) => {
      var dateObj =new Date(date);
      var dateString = dateObj.toString();
      var output = dateString.substring(16, 25);
      return(output);
  }
  
  const onOrderUpdate = (orderId) =>{
    const payload = {
      orderId,
      type,
    };
    dispatch(adminUpdateOrder(payload));
  };
  
    return(
      <Layout sidebar>
         
              <div className="KotContainer">
              <h4 style={{textAlign:'center'}}>Kitchen Order Ticketing (KOT)</h4>
                {
                  order.orders.map((order,index) => (
                    (order.orderStatus[0].isCompleted === true && 
                     order.orderStatus[1].isCompleted === false &&
                     order.orderStatus[2].isCompleted === false &&
                     order.orderStatus[3].isCompleted === false && 
                     order.orderStatus[4].isCompleted === false
                     ? 
                     <div className="KOT">
                        <div className="KotBill">
                            Bill No: {index+ 1}
                        </div>
  
                        <div className="KotItem">
                          <>
                            <div className="productsQty">
                              <span className="productsHeading">Products Name</span>
                              <span className="QtyHeading">Qty</span>
                            </div>
  
                            {order.items.map((item, index) => (
                              
                              <div className="itemAndQty">
                               
                                <div className="insideKotItem">
                                    {item.productId.name} 
                                </div>
                                <div className="qtyInsideKotItem">
                                    {item.purchasedQty}
                                </div>
                              </div>
                            ))}
                          </>
                        </div>
                        
                        <div className="KotTime">
                            {showDate(order.createdAt)}
                        </div>
                        
                        <div className="status">
                          <select className="orderStatus" onChange={(e) => setType(e.target.value)}>
                            <option value={""}>Order Status</option>
                              {order.orderStatus.map((status) => {
                                return(
                                <>
                                  {!status.isCompleted ? (
                                    <option 
                                    key={status.type} 
                                    value={status.type}
                                    >
                                      {status.type}
                                    </option>
                                  ) : null}
                                </>)
                              })}
                            </select>
                            <button className="KotstatusBtn" onClick = {() => onOrderUpdate(order._id)}>
                              confirm
                            </button>
                          </div>
  
                      </div>
                      : null)
                            
                        ))
                      }
                </div>
      </Layout>
     )
  
   }
  
  export default KOT