import React, { useState } from 'react';
import './style.css';
import facebook from './images/social_logos/facebook.png';
import instagram from './images/social_logos/instagram.png';
import twitter from './images/social_logos/twitter.svg';
import logo from './images/Logo/logo.jpg'
import chandan1 from './images/chandan1.jpg';
import { useHistory } from 'react-router-dom';
import Modal from '../UI/Modal';

/**
* @author
* @function Footer
**/

const Footer = (props) => {

  const [modal, setModal] = useState(false);
  let history = useHistory();

  const showModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
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

      <div className="footer">
          <div className="Logo">
            <img src={logo} onClick={() => history.push('/')} alt="nothing" />
            <h5 onClick={() => history.push('/')}>Get Your Food</h5>
          </div>

          <div className="textA">
            <h6>Contact us</h6>
            <p className="a">9811771892</p>
            <p className="a">getyourfood@gamil.com</p>
            <p className="a">Lahan, Siraha</p>
          </div>

          <div className="textB">
            <h6>Service hour</h6>
            <p className="b">8:00 am to 8:00pm</p>
            <h6>Delivery areas</h6>
            <p className="b">Lahan, Siraha</p>
          </div>

          <div className="social">
            <h5 onClick={() => history.push('/about')}>About Us</h5>
            <h5>Follow us on</h5>
            <div className="socialImg">
              <a href="https://www.facebook.com/Gety0urf00d" target="_blank" rel="noreferrer"><img src={facebook} alt="nothing" /></a>
              <img src={twitter} alt="nothing" onClick={() => alert('Currently not available!')} />
              <img src={instagram} alt="nothing" onClick={() => alert('Currently not available!')} />
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