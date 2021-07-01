import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Col} from 'react-bootstrap';
import { getAllCategory, getUserInitialData, getUserProductByCategory } from '../../actions';
import { generatePublicUrl } from '../../urlConfig';
import Modal from '../UI/Modal';
import './style.css';
import { addToCart } from '../../actions';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
* @author
* @function Product
**/

toast.configure();

const Product = (props) => {

  let history = useHistory();

  const product = useSelector(state => state.product);
  const category = useSelector(state => state.category);
  const auth = useSelector(state => state.auth);

  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProductByCategory());
    dispatch(getAllCategory());
  }, [])

  useEffect(() => {
    dispatch(getUserInitialData());
  }, []);

  const createCategoryList = (categories, options = []) => {
    for(let category of categories){
      options.push({ value: category._id, name: category.name})
    }
    return options;
  }

  const displayProductByCategory = () => {
    console.log(categoryId);
    dispatch(getUserProductByCategory(categoryId));
  }
  
  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailsModal(true);
    setShowImage(product.productPictures[0].img)
  }

  const closeProductDetailsModal = () => {
    setProductDetailsModal(false);
  }

  const renderShowProductDetailsModal = () => {
    if(!productDetails) {
      return null;
    }

  const showSelectedImage = (image) => {
    setShowImage(image);
  }

  const addCart = () => {
    if(auth.userAuthenticate){
      const { _id, name, price, subCategory, category } = productDetails;
      const img = productDetails.productPictures[0].img;
      dispatch(addToCart({_id, name,subCategory,category, price, img}));
      history.push('/cart');
    }else{
      toast.info('Please Login First! No Account? Register',{position: "top-center",})
    }
    setProductDetailsModal(false);
  }

    return(
      <Modal
        show={productDetailsModal}
        close={closeProductDetailsModal}
        modaltitle = {'Product Details'}
        size="lg"
        save={addCart}
        btntitle={'AddToCart'}
      >
         <div className="productImageDiv">
          <img src={generatePublicUrl(showImage)} alt="nothing"/>
         </div>

         <div className="productDetailsDiv">
          <Col>
            <label className="key">Name</label>
            <p className="value">{productDetails.subCategory}&nbsp;{productDetails.name}&nbsp;({productDetails.category.name})</p>
          </Col>

          <Col>
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
          
          <Col>
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>

          <Col>
            <lable className="key">Product Pictures</lable>
            <div style={{ display: 'flex' }}>
              {productDetails.productPictures.map(picture =>
                <div className="modalProductImgContainer">
                  <img src={generatePublicUrl(picture.img)} alt="nothing" onClick={() => {showSelectedImage(picture.img)}}/>
                </div>
              )}
            </div>
          </Col>
        </div>
       

      </Modal>
    )

  }

  return (
    <div className="Container">
      <div className="product">
        <h4>
        Our Products
        </h4>
      </div>

      <div className="cardProduct">
        <div className="insideCardProduct">
          <div className="categoryList">
            <select
              onClick={displayProductByCategory}
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}>
              <option>Select From Categories</option>
              {
                createCategoryList(category.categories).map(option =>
                  <option key={option.value} value={option.value}>{option.name}</option>)
              }
            </select>
          </div>
        
          {
            product.products.map(product =>
              <div className="productContainer">
                <div className="productImgContainer">
                  <img src={generatePublicUrl(product.productPictures[0].img)} alt="nothing" onClick={() => showProductDetailsModal(product)}/>
                </div>

                <div className="productInfo" style={{ 'margin': '5px 0' }}>
                  <div onClick={() => showProductDetailsModal(product)}>{product.subCategory}&nbsp;{product.name}</div>
                </div>

                <div className="productPrice">{product.price}</div>

              </div>)
          }

        </div>

      </div>
          {renderShowProductDetailsModal()}
    </div>
  )

}

export default Product