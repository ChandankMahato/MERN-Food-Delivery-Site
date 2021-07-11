import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Admin/Layout';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {addBanner, 
    deleteBanners as deleteBannersAction, 
    getAllBanner} from '../../../actions'

import CheckboxTree from 'react-checkbox-tree';
import {
    IoCheckboxSharp,
    IoCheckboxOutline,
} from 'react-icons/io5';

import {
    IoIosAdd,
    IoIosTrash,
} from 'react-icons/io';

import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import AddBannerModal from './component/AddBannerModal';
import DeleteBannerModal from './component/DeleteBannerModal';
import './style.css'
import { toast,Zoom } from 'react-toastify';

/**
* @author
* @function AdminBanner
**/

const AdminBanner = (props) => {

    const banner = useSelector(state => state.banner);
    const [bannerName, setBannerName] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [AddNewBannerModal, setAddNewBannerModal] = useState(false);
    const [deleteBannerModal, setDeleteBannerModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBanner());
    }, []);

    const addNewBanner = () => {
        const form = new FormData();
        form.append('bannerName', bannerName);
        form.append('bannerImage', bannerImage);

        dispatch(addBanner(form))
        .then(result => {
            if(result){
                dispatch(getAllBanner());
                
            }
        });

        if (bannerName === "") {
            toast.dark('Banner Name Must Be Provided To Create New Category!!!', {position: 'top-center', transition: Zoom});
        }

        setBannerName('');
        setBannerImage('');
        setAddNewBannerModal(false)
    }

    const CloseBannerModal = () => { setAddNewBannerModal(false) };
    const ShowBannerModal = () => setAddNewBannerModal(true);

    const renderBanners = (banners) => {
        let myBanners = [];
        for (let banner of banners) {
            myBanners.push(
                {
                    label: banner.bannerName,
                    value: banner._id,
                }
            )
        }
        return myBanners;
    }

    const createBannerList = (banners, options = []) => {
        for (let banner of banners) {
          options.push({ value: banner._id, bannerName: banner.bannerName });
        }
        return options;
      }

    const handleBannerImage = (e) => {
        setBannerImage(e.target.files[0]);
    }


    const updateCheckedAndExpandedCategories = () => {
        
        const banners = createBannerList(banner.banners);
        const checkedArray = [];

        checked.length > 0 && checked.forEach((bannerId, index) => {
            const banner =banners.find((banner, _index) => bannerId === banner.value);
            banner && checkedArray.push(banner);
        })
        setCheckedArray(checkedArray);
        console.log(checkedArray);
    }

    const closeDeleteBannerModal = () => {
        setDeleteBannerModal(false);
        setCheckedArray([]);
    }

    const DeleteBanner = () => {
        updateCheckedAndExpandedCategories();
        setDeleteBannerModal(true);
    }

    const deleteBanners = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({_id: item.value}));

        if(checkedIdsArray.length > 0){
            dispatch(deleteBannersAction(checkedIdsArray))
            .then(result => {
                if(result){
                    dispatch(getAllBanner());
                }
            })
        }
        SaveDeleteBanner();
    }

    const SaveDeleteBanner = () => {
        setDeleteBannerModal(false);
        setCheckedArray([]);
    }

    const NotDeleteBanner = () => {
        toast.dark('No, if you want to delete you must expand and checked as you wish', {position: 'top-center', transiont: Zoom});
        setDeleteBannerModal(false);
    }


return (
    <Layout sidebar>
        <Container>
            <Row>
                <Col md={12}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3>Banner</h3>
                        <div className="actionBtnContainer">
                            <span>Actions:  </span>
                            <button onClick={ShowBannerModal}><IoIosAdd /><span>Add</span></button>
                            <button onClick={DeleteBanner}><IoIosTrash /><span>Delete</span></button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <CheckboxTree
                        nodes={renderBanners(banner.banners)}
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

        <AddBannerModal
            show = { AddNewBannerModal }
            close = { CloseBannerModal }
            modaltitle = { 'Add New Category'}
            save = { addNewBanner }
            btntitle = { 'Save Changes'}
            bannerName={bannerName}
            setBannerName={setBannerName}
            handleBannerImage={handleBannerImage}

        />

        <DeleteBannerModal 
            modaltitle = {'Delete Banner Modal'}
            show = {deleteBannerModal}
            close = {closeDeleteBannerModal}
            btntitle = {'Delete'}
            save = {deleteBanners}
            buttons = {[
                 {
                     label: 'No',
                     color: 'primary',
                     onClick: NotDeleteBanner
                 },
                 {
                     label: 'Yes',
                     color: 'danger',
                     onClick: deleteBanners
                 }
            ]}
            checkedArray={checkedArray}
        />

    </Layout >
)

}

export default AdminBanner