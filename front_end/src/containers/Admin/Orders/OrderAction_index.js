import React, { useState } from 'react';
import Layout from '../../../components/Admin/Layout';
import {Container, Row, Col, Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { adminUpdateDBStatus } from '../../../actions/order.action';

/**
* @author
* @function AdminOrderAction
**/

const AdminOrderAction = (props) => {

  const order = useSelector(state => state.order);
  const [type, setType] = useState("");
  const [dbtype, setDBType] = useState("");
  const dispatch = useDispatch();

  const renderProducts = () => {

    const onDBStatusUpdate = (orderId) => {
      const payload = {
        orderId, 
        dbtype,
      };
      dispatch(adminUpdateDBStatus(payload))
    };
    return (
      <Table className="tables" responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>mobileNumber</th> 
            <th>Total Price</th>
            <th style={{textAlign:'center'}}>DB Status</th>
          </tr>
        </thead>
        <tbody>
          {order.orders.length > 0
            ? order.orders.map((order, index) => (
              (order.dbStatus[0].isSelected === true &&
               order.dbStatus[1].isSelected === false &&
               order.dbStatus[2].isSelected === false &&
               order.dbStatus[3].isSelected === false &&
               order.dbStatus[4].isSelected === false &&
               order.dbStatus[5].isSelected === false ?
               <tr key={order._id}>
                <td>{index+1}</td>
                <td>{order.address_name}</td>
                <td>{order.address_mobileNumber}</td>
                <td>{order.totalAmount}</td>
                <td style={{width:'25%', textAlign:'center'}}>
                  <div style={{height:'30px'}}>
                  <select className="statusSelect" onChange={(e) => setDBType(e.target.value)}>
                    <option value={""}>DB Status</option>
                      {order.dbStatus.map((status) => {
                        return(
                        <>
                          {!status.isSelected ? (
                            <option 
                            key={status.dbtype} 
                            value={status.dbtype}
                            >
                              {status.dbtype}
                            </option>
                          ) : null}
                        </>)
                      })}
                    </select>
                    <button className="actionBtns" onClick = {() => onDBStatusUpdate(order._id)}>
                      confirm
                    </button>
                  </div>
                </td>
              </tr> : null
              )
            )) :null
          }
          
        </tbody>
      </Table>
    )
  }

  return(
      <Layout sidebar>
        <Container className="orderContainer">
          <Row>
            <Col md={12}>
              <div style={{display:'flex', justifyContent: 'space-between'}}>
                <h3>Orders Action</h3>
              </div>
            </Col>
          </Row>
        </Container>
          {renderProducts()}
      </Layout>
   )

 }

export default AdminOrderAction