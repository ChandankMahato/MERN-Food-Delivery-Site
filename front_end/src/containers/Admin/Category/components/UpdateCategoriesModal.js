import React from 'react';
import Input from '../../../../components/UI/Input';
import Modal from '../../../../components/UI/Modal';
import {Row, Col} from 'react-bootstrap';

const UpdateCategoriesModal = (props) => {
    
    const {
        size,
        show,
        close,
        modaltitle,
        btntitle,
        save,
        checkedArray,
        handleCategoryInput,
        handleCategoryImage
    } = props;

    return (
        // modal to edit category
        < Modal
            show={show}
            close={close}
            modaltitle={modaltitle}
            btntitle={btntitle}
            size={size}
            save = {save}
        >
            
            <h6>Checked</h6>

            {
                checkedArray.length > 0 &&
                checkedArray.map((item, index) =>
                    <Row>
                        <Col>
                            <Input
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                            />
                        </Col>
                    </Row>
                )
            }
            <p></p>

             {/* //input for category image */}
            <input type="file" name="categoryImage" onChange={handleCategoryImage} />
        </Modal >
    );
}

export default UpdateCategoriesModal;