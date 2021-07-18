import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './style.css';

/**
* @author
* @function Modal
**/

const NewModal = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modaltitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {
                    props.buttons ? props.buttons.map((btn,index) => 
                        <Button key={index} variant={btn.color} onClick={btn.onClick}>
                            {btn.label}
                        </Button>
                    ):
                    <Button 
                        variant="primary"
                        {...props} 
                        className="btn-sm" 
                        onClick={props.save}
                    >
                        {props.btntitle}
                    </Button>
                } 
            </Modal.Footer>
        </Modal>
    )
}

export default NewModal