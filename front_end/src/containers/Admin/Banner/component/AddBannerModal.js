import React from 'react';
import Input from '../../../../components/UI/Input';
import Modal from '../../../../components/UI/Modal';
import {Row, Col} from 'react-bootstrap';


const AddBannerModal = (props) => {

    const {
        show,
        close,
        modaltitle,
        save,
        btntitle,
        bannerName,
        setBannerName,
        handleBannerImage
    } = props;

    return (
        //modal to add category
        < Modal
            show = {show}
            close = {close}
            modaltitle = {modaltitle}
            save = {save}
            btntitle = {btntitle}
        >
            <Row>
                <Col>
                    <Input
                        value={bannerName}
                        placeholder={`Banner Name`}
                        onChange={(e) => setBannerName(e.target.value)}
                        className= "form-control-sm"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* //input for category image */}
                    <input type="file" name="bannerImage" onChange={handleBannerImage} />
                </Col>
            </Row>
</Modal >

    )
}

export default AddBannerModal;