import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Admin/Layout';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/UI/Input';
import { addAdminProduct, adminUpdateProduct, deleteAdminProductById, getAdminInitialData, getAdminProducts, getAllCategory } from '../../../actions';
import Modal from '../../../components/UI/Modal';
import './style.css';
import { generatePublicUrl } from '../../../urlConfig';
import { Bounce, toast } from 'react-toastify';

/**
* @author
* @function AdminProducts
**/

const AdminProducts = (props) => {

  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDiscription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);

  const [AddNewProductModal, setAddNewProductModal] = useState(false);
  const [productUpdateModal, setProductUpdateModal] = useState(false);

  const dispatch = useDispatch();
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [productDeleteModal, setProductDeleteModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  const category = useSelector(state => state.category);
  const product = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllCategory());
    dispatch(getAdminInitialData());
  }, []);

  const addNewProduct = () => {

    const form = new FormData();

    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);

    for (let pic of productPictures){
      form.append('productPicture', pic);
    }

    dispatch(addAdminProduct(form))
    .then(result => {
      if(result){
          dispatch(getAdminProducts());
          dispatch(getAdminInitialData());
      }
  });
    setAddNewProductModal(false)
    setName('');
    setQuantity('');
    setPrice('');
    setDiscription('');
    setCategoryId('');
    setProductPictures([]);
  }

    
    const updateProduct = () => {
      
      const form = new FormData();
      form.append('_id', productId)
      form.append('name', name);
      form.append('quantity', quantity);
      form.append('price', price);
      form.append('description', description);
      form.append('category', categoryId);

      dispatch(adminUpdateProduct(form))
      .then(result => {
        if(result){
            dispatch(getAdminProducts());
            dispatch(getAdminInitialData());
        }
    });

      setName('');
      setQuantity('');
      setPrice('');
      setDiscription('');
      setCategoryId('');
      setProductPictures([]);

      setProductUpdateModal(false)
    }

  const showProductUpdateModal = (product) => {
    setProductUpdateModal(true)
    setProductId(product._id);
    setName(product.name);
    setQuantity(product.quantity);
    setCategoryId(product.category._id);
    setPrice(product.price);
    setDiscription(product.description);
  };

  const closeProductUpdateModal = () => {
    setProductUpdateModal(false);
    setName('');
    setQuantity('');
    setPrice('');
    setDiscription('');
    setCategoryId('');
    setProductPictures([]);
  }

  const deleteProduct = () => {
    const payload = {
      productId: product._id,
    };
    dispatch(deleteAdminProductById(payload))
    .then(result => {
      if(result){
          dispatch(getAdminProducts());
          dispatch(getAdminInitialData());
      }
  });
  closeProductDeleteModal();
  toast.success('Product Deleted', { position: 'top-center', transition: Bounce});
}

const showProductDeleteModal = (product) => {
  setProductDeleteModal(product);
  setProductId(product._id);
  setProductDeleteModal(true);
}
const closeProductDeleteModal = () => {setProductDeleteModal(false)};




  const closeAddNewProductModal = () => { setAddNewProductModal(false) };
  const showAddNewProductModal = () => setAddNewProductModal(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
        options.push({ value: category._id, name: category.name});
    }
    return options;
  }

  const handleProductPictures = (e) => {
    setProductPictures([
      ...productPictures,
      e.target.files[0]
    ]);
  }

  const renderProducts = () => {

    return (

      <Table className="tables" responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th style={{textAlign:'center'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product, index) => (
              <tr key={product._id}>
                <td>{index+1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category.name}</td>
                <td style={{width:'25%', textAlign:'center'}}>
                  <button className="actionBtns" onClick={() => showProductDetailsModal(product)}>
                    info
                  </button>
                  <button className="actionBtns" onClick={() => showProductUpdateModal(product)}>
                    edit
                  </button>
                  <button className="actionBtns" onClick={() => showProductDeleteModal(product)}>
                    del
                  </button>
                </td>
              </tr>
            ))
            :null}
        </tbody>
      </Table>
    )
  }

  
  const renderProductDeleteModal = () => {

    if(!productDetails){
      return null;
    }

    return(
      <Modal
      show={productDeleteModal}
      close={closeProductDeleteModal}
      modaltitle={'Delete Product'}
      buttons = {[
          {
              label: 'No',
              color: 'primary',
              onClick: closeProductDeleteModal
          },
          {
              label: 'Yes',
              color: 'danger',
              onClick: deleteProduct
          }
        ]}
        size="md"
      >
       <Row>
          <Col md="6">
            <label className="keyAdmin">Name</label>
            <p className="valueAdmin">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="keyAdmi">Category</label>
            <p className="valueAdmin">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="keyAdmin">Price</label>
            <p className="valueAdmin">{productDetails.price}</p>
          </Col>
          <Col md="6">
            <label className="keyAdmin">Quantity</label>
            <p className="valueAdmin">{productDetails.quantity}</p>
          </Col>
        </Row>
      </Modal>
    )
  }


  const renderAddProductsModal = () => {
    return (
      <Modal
        show={AddNewProductModal}
        close={closeAddNewProductModal}
        modaltitle={'Add New Products'}
        save={addNewProduct}
        btntitle={'Save Changes'}
      >
        <Input
          label="Name"
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder={`Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDiscription(e.target.value)}
        />

        {/* select input */}
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}>
          <option>select category</option>
          {
            createCategoryList(category.categories).map(option =>
              <option key={option.value} value={option.value}>{option.name}</option>)
          }
        </select>

        {
            productPictures.length > 0 ?
            productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
        }

        {/* input for products image */}
        <input type="file" name="productPicture" onChange={handleProductPictures} />
      </Modal>
    );
  }

  const renderProductUpdateModal = () => {
    return (
      <Modal
        show={productUpdateModal}
        close={closeProductUpdateModal}
        modaltitle={'Update Products'}
        save={updateProduct}
        btntitle={'Update'}
      >
        <Input
          label="Name"
          value={name}
          placeholder={`Product Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          placeholder={`Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDiscription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}>
          <option>select category</option>
          {
            createCategoryList(category.categories).map(option =>
              <option key={option.value} value={option.value}>{option.name}</option>)
          }
        </select>
      </Modal>
    );
  }

  const handleCloseProductDetailsModal = () => {
    setProductDetailsModal(false);
  }

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailsModal(true);
    console.log(product);
  }

  const renderShowProductDetailsModal = () => {

    if (!productDetails) {
      return null;
    }

    return (
      <Modal
        show={productDetailsModal}
        close={handleCloseProductDetailsModal}
        modalTitle={'Products Details'}
        btntitle="close"
        save={() => setProductDetailsModal(false)}
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="keyAdmin">Name</label>
            <p className="valueAdmin">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="keyAdmin">Price</label>
            <p className="valueAdmin">{productDetails.price}</p>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <label className="keyAdmin">Quantity</label>
            <p className="valueAdmin">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="keyAdmin">Category</label>
            <p className="valueAdmin">{productDetails.category.name}</p>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <label className="keyAdmin">Description</label>
            <p className="valueAdmin">{productDetails.description}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <lable className="keyAdmin">Product Pictures</lable>
            <div style={{ display: 'flex' }}>
              {productDetails.productPictures.map(picture =>
                <div className="productImgContainerAdmin">
                  <img src={generatePublicUrl(picture.img)} alt="nothing"/>
                </div>
              )}
            </div>
          </Col>
        </Row>

      </Modal>
    );
  }

  return (
    <Layout sidebar>

      <Container className="productContainerAdmin">
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <button className="actionBtns" onClick={showAddNewProductModal}>Add</button>
            </div>
          </Col>
        </Row>

        {/* Table */}
        <Row>
          <Col>
            {renderProducts()}
          </Col>
        </Row>
      </Container>
      {renderAddProductsModal()}
      {renderShowProductDetailsModal()}
      {renderProductUpdateModal()}
      {renderProductDeleteModal()}
    </Layout>
  )

}

export default AdminProducts