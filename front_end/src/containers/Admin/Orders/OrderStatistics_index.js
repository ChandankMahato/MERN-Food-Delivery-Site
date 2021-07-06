import React, { useState } from 'react';
import Layout from '../../../components/Admin/Layout';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useSelector } from 'react-redux';
import Modal from '../../../components/UI/Modal';
import { generatePublicUrl } from '../../../urlConfig';
import './style.css';

/**
* @author
* @function AdminOrderStatistics
**/

const AdminOrderStatistics = (props) => {

  const [orderDetailsModal, setOrderDetailsModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const order = useSelector(state => state.order);

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
              </tr>
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
          <Col md="12">
              <label className="key">Product Pictures</label>
                    
              <div >
                {orderDetails.items.map((item,index) => (
                  <Row>
                    <div key={index}>
                      <Row className="pName">
                      {item.productId.name}
                      </Row>
                      {item.productId.productPictures.map((image,index) => (
                          <div key={index} className="productImgContainer">
                            <img src={generatePublicUrl(image.img)} alt="nothing"/>
                          </div>
                      ))} 
                    </div>
                  </Row>
                ))}
              </div>
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

      </Modal>
    )
  }

  return(
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{display:'flex', justifyContent: 'space-between'}}>
                <h3>Orders</h3>
              </div>
            </Col>
          </Row>
        </Container>
          {/* {handleProductPictures()} */}
          {renderProducts()}
          {renderShowProductDetailsModal()}
      </Layout>
   )

 }

export default AdminOrderStatistics