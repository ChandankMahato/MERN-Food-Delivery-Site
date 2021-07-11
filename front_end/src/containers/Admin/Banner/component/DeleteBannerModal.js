import React from 'react';
import Modal from '../../../../components/UI/Modal';


const DeleteBannerModal = (props) => {

    const {
        show,
        close,
        modaltitle,
        btntitle,
        save,
        buttons,
        checkedArray,
    } = props;

    return (
        <Modal
            modaltitle = {modaltitle}
            show = {show}
            close = {close}
            btntitle = {btntitle}
            save = {save}
            buttons = {buttons}
        >
            <h5>Checked</h5>
            {
                checkedArray.map((item, index) => <span key={index}>{item.bannerName}</span>)
            }

        </Modal>
    )
}

export default DeleteBannerModal;