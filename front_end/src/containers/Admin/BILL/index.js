import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {adminUpdateOrder} from '../../../actions';
import Layout from '../../../components/Admin/Layout';
import './Billstyle.css';

/**
* @author
* @function BILL
**/


const BILL = (props) => {
    
  const order = useSelector(state => state.order);
  const adminAuth = useSelector(state => state.adminAuth);

  const [base, setBase] = useState('');
  const [count, setCount] = useState(0);
  const [temp1, setTemp1] = useState(1);
  const [temp2, setTemp2] = useState(2);

  const [type, setType] = useState("");
  const dispatch = useDispatch();


  useEffect(() => {
    const authNumber = adminAuth.admin.mobile;
    switch (authNumber){
      case 1111111111:
          setBase('B1');
          setCount(1);
          setTemp1(2);
          setTemp2(4);
        break;
      case 2222222222:
          setBase('B2');
          setCount(2);
          setTemp1(2);
          setTemp2(4);
        break;
      case 3333333333:
          setBase('B3');
          setCount(3);
          setTemp1(2);
          setTemp2(4);
          break;
      case 4444444444:
          setBase('B4');
          setCount(4);
          setTemp1(2);
          setTemp2(4);
          break;
      case 5555555555:
          setBase('B5');
          setCount(5);
          setTemp1(2);
          setTemp2(4);
          break;
      default:
          setBase('CR');
          setCount(0);
        break;
    }
  }, [adminAuth.admin.mobile]);

  console.log(base);
  
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
       
            <div className="billKotContainer">
              {
                order.orders.map((order,index) => (
                  (order.orderStatus[temp1].isCompleted === true &&
                   order.orderStatus[temp2].isCompleted === false &&
                   order.dbStatus[count].dbtype === base && 
                   order.dbStatus[count].isSelected === true 
                   ? 
                   <div className="billKOT">
                      <div className="billKotBill">
                          Bill No: {index+ 1}
                      </div>

                      <div className="billKotItem">
                        <>
                          <div className="billproductsQty">
                            <span className="billproductsHeading">Products Name</span>
                            <span className="billQtyHeading">Qty</span>
                            <span className="billpriceHeadingBill">Price</span>
                          </div>

                          {order.items.map((item, index) => (
                            
                            <div className="billitemAndQty">
                            
                              <div className="billinsideKotItem">
                                  {item.productId.name} 
                              </div>
                              <div className="priceInsideKotItemBill">
                                {item.productId.price}
                              </div>
                              <div className="billqtyInsideKotItem">
                                  {item.purchasedQty}
                              </div>
                            </div>
                          ))}
                        </>
                      </div>

                      <div className="billcustomerDetailsHeading">
                        <span>Customer Details</span>
                      </div>

                      <div className="billcustomerDetails">
                        <div className="billdetails">
                          <div className="billtitle"><span >Name:</span>&nbsp;&nbsp;{order.address_name}</div>
                          <div className="billtitle"><span >Mobile:</span>&nbsp;&nbsp;{order.address_mobileNumber} / {order.address_alternatePhone}</div>
                          <div className="billtitle"><span> Address:</span>&nbsp;&nbsp;{order.address_address},&nbsp;{order.address_locality},&nbsp;{order.address_landmark}</div>
                          <div className="billtitle"><span >Amount:</span>&nbsp;&nbsp;{order.totalAmount}</div>
                        </div>
                      </div>


                      <div className="billKotTime">
                            {showDate(order.createdAt)}
                      </div>

                      <div className="billstatus">
                        <select className="billorderStatus" onChange={(e) => setType(e.target.value)}>
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
                          <button className="billstatusBtn" onClick = {() => onOrderUpdate(order._id)}>
                            confirm
                          </button>
                        </div>

                    </div> : null)
                          
                      ))
                    }
              </div>
    </Layout>
   )

 }

export default BILL