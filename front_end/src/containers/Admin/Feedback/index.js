import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Admin/Layout';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {deleteFeedback, getAllFeedback } from '../../../actions';
import Modal from '../../../components/UI/Modal';
import './style.css';
import { Bounce, toast } from 'react-toastify';

/**
* @author
* @function Feedbacks
**/

const Feedbacks = (props) => {
  const [messageDetailsModal, setMessageDetailsModal] = useState(false);
  const [messageDeleteModal, setMessageDeleteModal] = useState(false);
  const [messageDetails, setMessageDetails] = useState(null);
  const [feedbackId, setFeedbackId] = useState('');
  const dispatch = useDispatch();
  const feedback = useSelector(state => state.feedback);

  useEffect(() => {
    dispatch(getAllFeedback());
  }, []);

  const deleteFeedBackMessage = () => {
      const payload = {
        feedbackId,
      };
      dispatch(deleteFeedback(payload))
      .then(result => {
        if(result){
            dispatch(getAllFeedback());
        }
    });
    setMessageDeleteModal(false);
    toast.success('Message Deleted', { position: 'top-center', transition: Bounce});
  }

  const renderFeedbacks = () => {
    return (
      <Table className="tables" responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Mobile</th>
            <th style={{textAlign:'center'}}>Message</th>
          </tr>
        </thead>
        <tbody>
          {feedback.feedBacks.length > 0
            ? feedback.feedBacks.map((feedback, index) => (
              <tr key={feedback._id}>
                <td>{index+1}</td>
                <td>{feedback.Name}</td>
                <td>{feedback.Mobile}</td>
                <td style={{width:'40%', textAlign:'center'}}>
                  <div style={{height:'30px'}}>
                    <button className="actionBtns" onClick={() => ShowMessageDetailsModal(feedback)}>
                      Show
                    </button>
                    <button className="actionBtns" onClick={() => ShowMessageDeleteModal(feedback)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
            :null}
        </tbody>
      </Table>
    )
  }

  const ShowMessageDetailsModal = (feedback) => {
    setMessageDetails(feedback);
    setMessageDetailsModal(true);
  }

  const closeMessageDetailsModal = () =>{
    setMessageDetailsModal(false);
  }

  
  const ShowMessageDeleteModal = (feedback) => {
    setFeedbackId(feedback._id);
    setMessageDetails(feedback);
    setMessageDeleteModal(true);
  }

  const closeMessageDeleteModal = () => {
    setMessageDeleteModal(false);
  }

  const renderMessageDeleteModal = () => {
    if (!messageDetails) {
      return null;
    }

    return(
      <Modal
      show={messageDeleteModal}
      close={closeMessageDeleteModal}
      modaltitle={'Message Details'}
      buttons = {[
        {
            label: 'No',
            color: 'primary',
            onClick: closeMessageDeleteModal
        },
        {
            label: 'Yes',
            color: 'danger',
            onClick: deleteFeedBackMessage
        }
      ]}
      size="md"
      >
        <Row>
          <Col md="12">
            <label className="key">Name</label>
            <p className="value">{messageDetails.Name}</p>
          </Col>
          <Col md="12">
            <label className="key">Mobile</label>
            <p className="value">{messageDetails.Mobile}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Message</label>
            <p className="value">{messageDetails.Message}</p>
          </Col>
        </Row>
      </Modal>
    )
  }


  const renderShowMessageDetailsModal = () => {
    if (!messageDetails) {
      return null;
    }

    return (
      <Modal
        show={messageDetailsModal}
        close={closeMessageDetailsModal}
        modaltitle={'Message Details'}
        btntitle ={'Close'}
        size="md"
        save={closeMessageDetailsModal}
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{messageDetails.Name}</p>
          </Col>
          <Col md="6">
            <label className="key">Mobile</label>
            <p className="value">{messageDetails.Mobile}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Message</label>
            <p className="value">{messageDetails.Message}</p>
          </Col>
        </Row>
      </Modal>
    );
  }

  return (
    <Layout sidebar>

      <Container className="feedbackContainer">
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>FeedBacks</h3>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            {renderFeedbacks()}
          </Col>
        </Row>
      </Container>
      {renderMessageDeleteModal()}
      {renderShowMessageDetailsModal()}
    </Layout>
  )

}

export default Feedbacks