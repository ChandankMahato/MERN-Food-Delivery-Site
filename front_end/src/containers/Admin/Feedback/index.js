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
  const [messageDetails, setMessageDetails] = useState(null);
  const dispatch = useDispatch();
  const feedback = useSelector(state => state.feedback);

  useEffect(() => {
    dispatch(getAllFeedback());
  }, []);

  const deleteFeedBackMessage = (feedbackId) => {
      const payload = {
        feedbackId,
      };
      dispatch(deleteFeedback(payload))
      .then(result => {
        if(result){
            dispatch(getAllFeedback());
        }
    });
    closeMessageDetailsModal();
    toast.success('Message Deleted', { position: 'top-center', transition: Bounce});
  }

  const renderFeedbacks = () => {
    return (
      <Table style={{ fontSize: '15px' }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {feedback.feedBacks.length > 0
            ? feedback.feedBacks.map((feedback, index) => (
              <tr key={feedback._id}>
                <td>{index+1}</td>
                <td>{feedback.Name}</td>
                <td>{feedback.Mobile}</td>
                <td>
                  <button onClick={() => ShowMessageDetailsModal(feedback)}>
                    Show
                  </button>
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

  const renderShowMessageDetailsModal = () => {
    if (!messageDetails) {
      return null;
    }

    return (
      <Modal
        show={messageDetailsModal}
        close={closeMessageDetailsModal}
        modaltitle={'Message Details'}
        btntitle ={'Delete'}
        size="md"
        save = {() => deleteFeedBackMessage(messageDetails._id)}
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

      <Container>
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
      {renderShowMessageDetailsModal()}
    </Layout>
  )

}

export default Feedbacks