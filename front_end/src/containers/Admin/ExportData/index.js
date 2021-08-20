import React, { useState } from 'react';
import Layout from '../../../components/Admin/Layout';
import {Container, Row, Col, Table} from 'react-bootstrap';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {useSelector } from 'react-redux';
import './style.css';

/**
* @author
* @function ExportData
**/

const ExportData = (props) => {

  const [selectedDate, setSelectedDate] = useState(Date());
  const order = useSelector(state => state.order);
  const [check, setCheck] = useState(true);

  
  const checkToShowAllOrders = () =>{
    setCheck(true);
  }

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

  const setDateToShowOrder = (e) => {
    setCheck(false);
    setSelectedDate(e.target.value);
  }

  const renderProducts = () => {

    return (
      <>
        <Table className="tables" responsive="sm" id="exportToExcel">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Number</th> 
              <th>Customer Name</th>
              <th>mobileNumber</th>
              <th>Item</th>
              <th>Total Price</th>
              <th>Customer Address</th>
              <th>Alternate Phone</th>
              <th>landmark</th>
              <th>locality</th>
            </tr>
          </thead>
          <tbody>
            {order.orders.length > 0
              ? order.orders.map((order, index) => (

                (
                  new Date(order.createdAt).toDateString() === new Date(selectedDate).toString().substring(0,15) && check===false? 
                  <tr key={order._id}>
                  <td>{index+1}</td>
                  <td>{order.userId.fullName}</td>
                  <td>{order.userId.mobile}</td>
                  <td>{order.address_name}</td>
                  <td>{order.address_mobileNumber}</td>
                  <td>{order.items.map((item) => (item.productId.name + '(' + (item.purchasedQty) + ') '))}</td>
                  <td>{order.totalAmount}</td>
                  <td>{order.address_address}</td>
                  <td>{order.address_alternatePhone}</td>
                  <td>{order.address_landmark}</td>
                  <td>{order.address_locality}</td>
                </tr> :( check === true ?
                      <tr key={order._id}>
                      <td>{index+1}</td>
                      <td>{order.userId.fullName}</td>
                      <td>{order.userId.mobile}</td>
                      <td>{order.address_name}</td>
                      <td>{order.address_mobileNumber}</td>
                      <td>{order.items.map((item) => (item.productId.name + '(' + (item.purchasedQty) + ') '))}</td>
                      <td>{order.totalAmount}</td>
                      <td>{order.address_address}</td>
                      <td>{order.address_alternatePhone}</td>
                      <td>{order.address_landmark}</td>
                      <td>{order.address_locality}</td>
                      </tr> : null
                  )
                )
              )) :null
            }
            
          </tbody>
        </Table>
        <ReactHTMLTableToExcel 
          className="exportBtn" 
          table="exportToExcel"
          filename="gyfCustomerDetails"
          sheet="sheet"
          buttonText="Export Data To Excel"
        />
      </>
    )
  }

  return(
      <Layout sidebar>
        <Container className="orderContainer">
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

                <form className="dateForm">
                    <span className="dateText">Show Sales as of:</span>
                    <input type="date" name="order" min="2021-01-01" onChange={setDateToShowOrder} max="2026-01-01" required/>
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
                <button onClick={checkToShowAllOrders} className="showAllOrderBtn">Show All Orders</button>
            </Col>
          </Row>
        </Container>
          {renderProducts()}
      </Layout>
   )

 }

export default ExportData