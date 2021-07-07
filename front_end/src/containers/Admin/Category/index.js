import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Admin/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
     adminAddCategory, 
     getAllCategory,  
     adminUpdateCategories,
     adminDeleteCategories as deleteCategoriesAction
    } from '../../../actions';

//import for check box tree 
import CheckboxTree from 'react-checkbox-tree';
//import icons
import {
    IoCheckboxSharp,
    IoCheckboxOutline,
} from 'react-icons/io5';

import {
    IoIosAdd,
    IoIosTrash,
    IoIosCloud
} from 'react-icons/io';

//css for check box tree
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import UpdateCategoriesModal from './components/UpdateCategoriesModal';
import AddCategoryModal from './components/AddCategoryModal';
import DeleteCategoryModal from './components/DeleteCategoryModal';
import './style.css';
import {toast, Zoom } from 'react-toastify';

/**
* @author
* @function AdminCategory
**/

const AdminCategory = (props) => {

    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [AddNewCategoryModal, setAddNewCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    },[]);

    const addNewCategory = () => {

        const form = new FormData();

        form.append('name', categoryName);
        form.append('categoryImage', categoryImage);

        dispatch(adminAddCategory(form))
        .then(result => {
            if(result){
                dispatch(getAllCategory());
            }
        });

        if (categoryName === "") {
            toast.dark('Category Name Must Be Provided To Create New Category!!!',{position:'top-center', transition: Zoom});
        }

        setCategoryName('');
        setCategoryImage('');
        setAddNewCategoryModal(false)
    }

    const handleClose = () => { setAddNewCategoryModal(false) };
    const handleShow = () => setAddNewCategoryModal(true);

    //function display categories
    const renderCategories = (categories) => {

        let myCategories = [];

        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                }
            )
        }

        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
          options.push({ value: category._id, name: category.name });
        }
        return options;
      }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModal(true);
    }

    const updateCheckedAndExpandedCategories = () => {
        
        const categories = createCategoryList(category.categories);
        const checkedArray = [];

        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && checkedArray.push(category);
        })
        setCheckedArray(checkedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type === "checked") {
            const updateCheckedArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updateCheckedArray);
        }
    }

    const closeUpdateCategoryModal = () => {
        setUpdateCategoryModal(false);
        setCheckedArray([]);
    }

    const closeDeleteCategoryModal = () =>{
        setDeleteCategoryModal(false);
        setCheckedArray([]);
    }

    const DeleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({_id: item.value}));

        if(checkedIdsArray.length > 0){
            dispatch(deleteCategoriesAction(checkedIdsArray))
            .then(result => {
                if(result){
                    dispatch(getAllCategory());
                }
            });
        }
        SaveDeleteCategory();
    }

    const SaveDeleteCategory = () => {
        setDeleteCategoryModal(false);
        setCheckedArray([]);
    }

    const NotDeleteCategory = () => {
        toast.dark('No?, if you want to delete you must expand and checked as you wish', {position:'top-center', transition: Zoom});
        setDeleteCategoryModal(false);
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
        });

        dispatch(adminUpdateCategories(form))
        .then(result => {
            if(result){
                dispatch(getAllCategory());
            }
        });

        setUpdateCategoryModal(false);
    }

return (
    <Layout sidebar>
        <Container>
            <Row>
                <Col md={12}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Category</h3>
                        <div className="actionBtnContainer">
                            <span>Actions:  </span>
                            <button onClick={handleShow}><IoIosAdd /><span>Add</span></button>
                            <button onClick={DeleteCategory}><IoIosTrash /><span>Delete</span></button>
                            <button onClick={updateCategory}><IoIosCloud /><span>Edit</span></button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <CheckboxTree
                        nodes={renderCategories(category.categories)}
                        checked={checked}
                        onCheck={checked => setChecked(checked)}
                        icons={{
                            check: <IoCheckboxSharp />,
                            uncheck: <IoCheckboxOutline />,
                            halfCheck: <IoCheckboxOutline />,
                        }}
                    />
                </Col>
            </Row>
        </Container>

        <AddCategoryModal
            show = { AddNewCategoryModal }
            close = { handleClose }
            modaltitle = { 'Add New Category'}
            save = { addNewCategory }
            btntitle = { 'Save Changes'}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            handleCategoryImage={handleCategoryImage}

        />

        <UpdateCategoriesModal
            show={updateCategoryModal}
            close={closeUpdateCategoryModal}
            modaltitle={'Update Categories'}
            size="lg"
            btntitle={'Update Changes'}
            checkedArray={checkedArray}
            handleCategoryInput={handleCategoryInput}
            handleCategoryImage={handleCategoryImage}
            save = {updateCategoriesForm}
        />

        <DeleteCategoryModal 
            modaltitle = {'Delete Category Modal'}
            show = {deleteCategoryModal}
            close = {closeDeleteCategoryModal}
            btntitle = {'Delete'}
            save = {deleteCategories}
            buttons = {[
                 {
                     label: 'No',
                     color: 'primary',
                     onClick: NotDeleteCategory
                 },
                 {
                     label: 'Yes',
                     color: 'danger',
                     onClick: deleteCategories
                 }
            ]}
            checkedArray={checkedArray}
        />

    </Layout >
)

}

export default AdminCategory