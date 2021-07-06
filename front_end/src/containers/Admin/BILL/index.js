import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminUpdateOrder } from '../../../actions';
import Layout from '../../../components/Admin/Layout';
import './style.css';

/**
* @author
* @function BILL
**/


const BILL = (props) => {
    
  const order = useSelector(state => state.order);
  const adminAuth = useSelector(state => state.adminAuth);

  const [base, setBase] = useState('');
  const [count, setCount] = useState(0);

  const [type, setType] = useState("");
  const dispatch = useDispatch();


  useEffect(() => {
    const authNumber = adminAuth.user.mobile;
    switch (authNumber){
      case 1111111111:
        setBase('B1');
        setCount(1);
        break;
      case 2222222222:
          setBase('B2');
          setCount(2);
        break;
      case 3333333333:
          setBase('B3');
          setCount(3);
          break;
      case 4444444444:
          setBase('B4');
          setCount(4);
          break;
      case 5555555555:
          setBase('B5');
          setCount(5);
          break;
      default:
        setBase('CR');
        setCount(0);
        break;
    }
  }, [adminAuth.user.mobile]);


    console.log('hello', base);
  
const showDate = (date) => {
    //converting UTC to GMT
    var dateObj =new Date(date);
    //converting to Object
    var dateString = dateObj.toString();
    //modifying string to get time only
    var output = dateString.substring(16, 25);
    //returning output
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
              {
                order.orders.map((order,index) => (
                  (order.orderStatus[2].isCompleted === true &&
                   order.orderStatus[3].isCompleted === false && 
                   order.orderStatus[4].isCompleted === false &&
                   order.dbStatus[count].dbtype === base && 
                   order.dbStatus[count].isSelected === true 
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
                                  {item.productId.subCategory}
                                  &nbsp;
                                  {item.productId.name} 
                                  &nbsp;
                                  ({item.categoryId.name})
                                  &nbsp;
                              </div>
                              <div className="qtyInsideKotItem">
                                  {item.purchasedQty}
                              </div>
                            </div>
                          ))}
                        </>
                      </div>

                      <div className="customerDetailsHeading">
                        <span>Customer Details</span>
                      </div>

                      <div className="customerDetails">
                        <div className="title">
                            <div>Name: </div>
                            <div>Mobile: </div>
                            <div>Address: </div>
                            <div>Amount: </div>
                        </div>
                        <div className="details">
                          <div>&nbsp;&nbsp;{order.address_name}</div>
                          <div>&nbsp;&nbsp;{order.address_mobileNumber} / {order.address_alternatePhone}</div>
                          <div>&nbsp;&nbsp;{order.address_address},&nbsp;{order.address_locality},&nbsp;{order.address_landmark}</div>
                          <div>&nbsp;&nbsp;{order.totalAmount}</div>
                        </div>

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
                          <button className="statusBtn" onClick = {() => onOrderUpdate(order._id)}>
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