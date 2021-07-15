import React, { useState } from 'react';
import Layout from '../../../components/Admin/Layout';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useSelector } from 'react-redux';
import Modal from '../../../components/UI/Modal';
import './style.css';

/**
* @author
* @function AdminOrderStatistics
**/

const AdminOrderStatistics = (props) => {

  const [orderDetailsModal, setOrderDetailsModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(Date());
  const order = useSelector(state => state.order);

  

  const showTotalOrderReceived = () => {
    var total = 0;
    for (var i=0; i< order.orders.length; i++){
      total += order.orders[i].totalAmount;
    }
    return total;
  }

  const showTotalSales = () => {
    var total = 0;
    for(var i=0; i< order.orders.length; i++){
      if(order.orders[i].orderStatus[4].isCompleted === true){
        total += order.orders[i].totalAmount;
      }
     
    }
    return total;
  }

  const showIndividualSales = (count) =>{
    var total = 0;
    for(var i=0; i<order.orders.length; i++){
      if(order.orders[i].dbStatus[count].isSelected === true && order.orders[i].orderStatus[4].isCompleted === true){
        total += order.orders[i].totalAmount;
      }
    }
    return total;
  }

  const TodayTotalSales = () => {
    var total = 0;
    for(var i=0; i<order.orders.length; i++){
      if(new Date(order.orders[i].createdAt).toDateString() === new Date(selectedDate).toString().substring(0,15) && order.orders[i].orderStatus[4].isCompleted === true){
        total += order.orders[i].totalAmount;
      }
    }
    return total;
  }


  const TodayIndividualSales = (count) =>{
    var total = 0;
    for(var i=0; i<order.orders.length; i++){
      if(new Date(order.orders[i].createdAt).toDateString() === new Date(selectedDate).toString().substring(0,15) && order.orders[i].dbStatus[count].isSelected === true && order.orders[i].orderStatus[4].isCompleted === true){
        total += order.orders[i].totalAmount;
      }
    }
    return total;
  }

  const renderProducts = () => {

    const showOrderDetailsModal = (order) => {
      setOrderDetails(order);
      setOrderDetailsModal(true);
    }

    return (
      <Table style={{fontSize: '15px'}} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>mobileNumber</th> 
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {order.orders.length > 0
            ? order.orders.map((order, index) => (
              (
                new Date(order.createdAt).toDateString() === new Date(selectedDate).toString().substring(0,15)? 
                <tr key={order._id}>
                  <td>{index+1}</td>
                  <td>{order.address_name}</td>
                  <td>{order.address_mobileNumber}</td>
                  <td>{order.totalAmount}</td>
                  <td>
                    <button onClick={() => showOrderDetailsModal(order)}>
                      Details
                    </button>
                  </td>
                </tr>: null
              )
            )) :null
          }
          
        </tbody>
      </Table>
    )
  }

  const renderShowProductDetailsModal = () => {

    if(!orderDetails){
      return null;
    }

    return (
      <Modal
        show={orderDetailsModal}
        close={() => setOrderDetailsModal(false)}
        modaltitle={'Ordered Details'}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">User Name</label>
            <p className="value">{orderDetails.userId.fullName}</p>
          </Col>
          <Col md="6">
            <label className="key">Mobile Number</label>
            <p className="value">{orderDetails.address_mobileNumber}</p>
          </Col>
        </Row>

          <Row>
          <Col md="6">
            <label className="key">Customer Name</label>
            <p className="value">{orderDetails.address_name}</p>
          </Col>
          <Col md="6">
            <label className="key">Alternate Phone Number</label>
            <p className="value">{orderDetails.address_alternatePhone}</p>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <label className="key">Address</label>
            <p className="value">{orderDetails.address_address}</p>
          </Col>
          <Col md="6">
            <label className="key">Locality</label>
            <p className="value">{orderDetails.address_locality}</p>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <label className="key">Address Type</label>
            <p className="value">{orderDetails.address_addressType}</p>
          </Col>
          <Col md="6">
            <label className="key">Landmark</label>
            <p className="value">{orderDetails.address_landmark}</p>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <label className="key">Products Name</label>
            {orderDetails.items.map((item, index) => (
              <div className="value" key={index}>
                {item.productId.name}
              </div>
            ))}
          </Col>
          <Col md="6">
            <label className="key">Product Quantity</label>
            {orderDetails.items.map((item,index) => (
              <div className="value" key={index}>
                {item.purchasedQty}
              </div>
            ))}
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <label className="key">Total Amount</label>
            <p className="value">{orderDetails.totalAmount}</p>
          </Col>
          <Col md="6">
            <label className="key">Payment Type</label>
            <p className="value">{orderDetails.paymentType}</p>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <label className="key">Payment Status</label>
            <p className="value">{orderDetails.paymentStatus}</p>
          </Col>
          <Col md="6">
            <label className="key">Order Status</label>
            <p className="value">
              {orderDetails.orderStatus[4].isCompleted ? 'Delivered' :
               orderDetails.orderStatus[3].isCompleted ? 'On The Way':
               orderDetails.orderStatus[2].isCompleted ? 'Packed' :
               orderDetails.orderStatus[1].isCompleted ? 'Cooked' :
               orderDetails.orderStatus[0].isCompleted ? 'Ordered' : 'null'}
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
              <label className="key">DB Status</label>
              <p className="value">
                {orderDetails.dbStatus[1].isSelected? 'B1' :
                 orderDetails.dbStatus[2].isSelected? 'B2' :
                 orderDetails.dbStatus[3].isSelected? 'B3' :
                 orderDetails.dbStatus[4].isSelected? 'B4' :
                 orderDetails.dbStatus[5].isSelected? 'B5' : 'CR'}
              </p>
          </Col>
        </Row>

      </Modal>
    )
  }

  return(
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
            <h3 style={{textAlign:'center'}}>Orders Statistics</h3>
              <h6 style={{textAlign: 'center'}}>Order Recived Amounts to: {showTotalOrderReceived()}</h6> 
              <p style={{textAlign:'center'}}>All Time Sales</p>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <h6>Total Sales: {showTotalSales()}</h6>
                  <h6>B1: {showIndividualSales(1)}</h6>
                  <h6>B2: {showIndividualSales(2)}</h6>
                  <h6>B3: {showIndividualSales(3)}</h6>
                  <h6>B4: {showIndividualSales(4)}</h6>
                  <h6>B5: {showIndividualSales(5)}</h6>
                </div>

                <form style={{textAlign:'center'}}>
                    <span className="dateText">Show Sales as of:</span>
                    <input type="date" name="order" min="2021-01-01" onChange={(e)=> setSelectedDate(e.target.value)} max="2026-01-01" required/>
                    <span className="validity"></span>
                </form>
              
              <div style={{display:'flex', justifyContent:'space-between'}}>
                  <h6>Total Sales: {TodayTotalSales()}</h6>
                  <h6>B1: {TodayIndividualSales(1)}</h6>
                  <h6>B2: {TodayIndividualSales(2)}</h6>
                  <h6>B3: {TodayIndividualSales(3)}</h6>
                  <h6>B4: {TodayIndividualSales(4)}</h6>
                  <h6>B5: {TodayIndividualSales(5)}</h6>
                </div>
            </Col>
          </Row>
        </Container>
          {renderProducts()}
          {renderShowProductDetailsModal()}
      </Layout>
   )

 }

export default AdminOrderStatistics