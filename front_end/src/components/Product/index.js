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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getUserInitialData());
  }, [])

  const triggerDisplayProductByCategory = (Id) => {
    dispatch(getUserProductByCategory(Id));
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
      const { _id, name, price, category } = productDetails;
      const img = productDetails.productPictures[0].img;
      dispatch(addToCart({_id, name,category, price, img}));
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
            <p className="value">{productDetails.name}</p>
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
<>
               
    <div className="categoryContainer">
      <div className="category">
        <h4>
        Categories
        </h4>
      </div>

      <div className="cardCategory">
        <div className="insideCardCategory">
          {
            category.categories.map(category =>
              <div className="containerCategory">

                  <div className="categoryImgContainer">
                    <img src={generatePublicUrl(category.categoryImage)} alt="nothing"  onClick={() => {triggerDisplayProductByCategory(category._id)}}/>
                  </div>

                  <div className="categoryName">
                    <span onClick={() => {triggerDisplayProductByCategory(category._id)}}>
                        {category.name}
                    </span>
                  </div>
                  
              </div>)
          }
        </div>
      </div>
    </div>


    <div className="Container">
      <div className="product">
        <h4>
        Our Products
        </h4>
      </div>

      <div className="cardProduct">
        <div className="insideCardProduct">
          {
            product.products.map(product =>
              <div className="productContainer">
                <div className="productImgContainer">
                  <img src={generatePublicUrl(product.productPictures[0].img)} alt="nothing" onClick={() => showProductDetailsModal(product)}/>
                </div>

                <div className="productInfo" style={{ 'margin': '5px 0' }}>
                  <div onClick={() => showProductDetailsModal(product)}>{product.name}</div>
                </div>

                <div className="productPrice">{product.price}</div>

              </div>)
          }

        </div>

      </div>
          {renderShowProductDetailsModal()}
    </div>
</>
  )

}

export default Product