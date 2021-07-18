import React, { useState } from 'react';
import './style.css';
import facebook from './images/social_logos/facebook.png';
import instagram from './images/social_logos/instagram.png';
import twitter from './images/social_logos/twitter.svg';
import logo from './images/Logo/logo.jpg'
import chandan1 from './images/chandan1.jpg';
import { useDispatch } from 'react-redux';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import {addFeedBack} from '../../actions';
import { Bounce, toast, Zoom } from 'react-toastify';

/**
* @author
* @function Footer
**/

const Footer = (props) => {

  const [modal, setModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const showModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  const showFeedbackModal = () => {
    setFeedbackModal(true);
  }

  const sendFeedBack = () => {
    if(mobile === '' && name === ''){
      toast.dark('Enter Mobile Number and name', {position: 'top-center', transition: Zoom});
      return;
    }else{
      if(mobile === ''){
        toast.dark("Enter Mobile Number", {position: 'top-center', transition:Zoom});
        return;
      }else if(mobile!==''){
        if(isNaN(mobile)){
          toast.dark("Mobile Number must be Number(0-9", {position: 'top-center', transition: Zoom});
          return;
        }else if(mobile.length !== 10){
          toast.dark("Enter 10 digit mobile Number", {position: 'top-center', transition: Zoom});
          return;
        }
      }
      if(name === ''){
        toast.dark("Enter Name", {postion: 'top-center', transition: Zoom});
        return;
      }
      if(message === ''){
        toast.dark("Enter Message", {position: 'top-center', transition: Zoom});
        return;
      }
    }
    const userMsg = {
      name,
      mobile,
      message
    }
    dispatch(addFeedBack(userMsg));
    setName('');
    setMobile('');
    setMessage('');
    toast.success("Feedback Sent, thank you", {position: 'top-center', transition: Bounce});
    setFeedbackModal(false);
  }

  const closeFeedbackModal = () => {
    setName('');
    setMobile('');
    setMessage('');
    setFeedbackModal(false);
  }

  return (
    <>

      <Modal
        show={modal}
        close={closeModal}
        modaltitle={'Designer/Developer'}
        size="sm"
        save={closeModal}
        btntitle={'Close'}
      >
        <img src={chandan1} alt="nothing" style={{ width:'270px', height:'270px'}}/>
        <p style={{marginBottom:'0'}}>Name: Chandan Kumar Mahato</p>
        <p style={{marginBottom:'0'}}>Contact: 9811771892</p>
        <p style={{marginBottom:'0'}}>Student At KU (CE)</p>
      </Modal>

      <Modal
        show={feedbackModal}
        close={closeFeedbackModal}
        modaltitle={'Feedback'}
        size="md"
        save={sendFeedBack}
        btntitle={'Send'}
      >
        <Input
          label="Name"
          value={name}
          placeholder={`Enter Your Fullname`}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Mobile"
          type={Number}
          value={mobile}
          placeholder={`Enter Your Mobile Number`}
          onChange={(e) => setMobile(e.target.value)}
        />
        <p>Message</p>
        <textarea placeholder="Message..." className="feedbackMessage" onChange={(e) => setMessage(e.target.value)}></textarea>
      </Modal>


      <div className="footer">
          <div className="Logo">
            <a href="/"><img src={logo} alt="nothing" /></a>
            <a href="/"><h5>Get Your Food</h5></a>
          </div>

          <div className="textA">
            <h6>Contact us</h6>
            <p className="a">9811771892</p>
            <p className="a">getyourfood@gamil.com</p>
            <p className="a">Lahan, Siraha</p>
            <p className="feedback" onClick={showFeedbackModal}>Your Feedback</p>
          </div>

          <div className="textB">
            <h6>Service hour</h6>
            <p className="b">8:00 am to 8:00pm</p>
            <h6>Delivery areas</h6>
            <p className="b">Lahan, Siraha</p>
          </div>

          <div className="social">
          <a href="/about"><h5>About Us</h5></a>
            <h5>Follow us on</h5>
            <div className="socialImg">
              <a href="https://www.facebook.com/Gety0urf00d" target="_blank" rel="noreferrer"><img src={facebook} alt="nothing" /></a>
              <img src={twitter} alt="nothing" onClick={() => toast.info('Currently not available!',{postion:'top-center', tarnsition: Bounce})} />
              <img src={instagram} alt="nothing" onClick={() => toast.info('Currently not available!',{position: 'top-center', transiton: Bounce})} />
            </div>
          </div>
        </div>

      <div className="copyright">
        <p className="content">copyright c 2021 Get Your Food. All right reserved.</p>
      </div>

      <div className="designer">
        <p className="content" onClick={showModal} style={{cursor:'pointer'}}>DesignerDeveloper: Chandan Kumar Mahato</p>
      </div>

    </>
  )

}

export default Footer