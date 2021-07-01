import React from 'react';
import Input from '../../../../components/UI/Input';
import Modal from '../../../../components/UI/Modal';
import {Row, Col} from 'react-bootstrap';


const AddCategoryModal = (props) => {

    const {
        show,
        close,
        modaltitle,
        save,
        btntitle,
        categoryName,
        setCategoryName,
        handleCategoryImage
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
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className= "form-control-sm"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* //input for category image */}
                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Col>
            </Row>
</Modal >

    )
}

export default AddCategoryModal;