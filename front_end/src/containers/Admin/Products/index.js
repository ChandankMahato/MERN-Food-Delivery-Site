import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Admin/Layout';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/UI/Input';
import { addAdminProduct, deleteAdminProductById, getAdminInitialData, getAdminProducts, getAllCategory } from '../../../actions';
import Modal from '../../../components/UI/Modal';
import './style.css';
import { generatePublicUrl } from '../../../urlConfig';

/**
* @author
* @function AdminProducts
**/

const AdminProducts = (props) => {

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDiscription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [AddNewProductModal, setAddNewProductModal] = useState(false);
  
  const dispatch = useDispatch();
  const [productDetailsModal, setProductDetailsModal] = useState(false);
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
    form.append('subCategory', subCategory);
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

    setName('');
    setQuantity('');
    setPrice('');
    setDiscription('');
    setSubCategory('');
    setCategoryId('');
    setProductPictures([]);

    setAddNewProductModal(false)
  }

  const handleClose = () => { setAddNewProductModal(false) };
  const handleShow = () => setAddNewProductModal(true);

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

      <Table style={{ fontSize: '15px' }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sub Category</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
              <tr key={product._id}>
                <td>2</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.subCategory}</td>
                <td>{product.category.name}</td>
                <td>
                  <button onClick={() => ShowProductDetailsModal(product)}>
                    info
                  </button>
                  <button
                    onClick={() => {
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
            
                    }}
                  >
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

  const renderAddProductsModal = () => {
    return (
      <Modal
        show={AddNewProductModal}
        close={handleClose}
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

        <Input
          label="Sub Category"
          value={subCategory}
          placeholder={`Sub Category`}
          onChange={(e) => setSubCategory(e.target.value)}
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

  const handleCloseProductDetailsModal = () => {
    setProductDetailsModal(false);
  }

  const ShowProductDetailsModal = (product) => {
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
        size="lg"
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Price</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <label className="key">Quantity</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Category</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Sub Category</label>
            <p className="value">{productDetails.subCategory}</p>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <label className="key">Description</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <lable className="key">Product Pictures</lable>
            <div style={{ display: 'flex' }}>
              {productDetails.productPictures.map(picture =>
                <div className="productImgContainer">
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

      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
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
    </Layout>
  )

}

export default AdminProducts