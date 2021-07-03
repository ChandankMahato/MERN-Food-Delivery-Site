import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getAddress, addOrder, getCartItems, userLogin } from '../../actions';
import { MaterialButton, MaterialInput, Anchor } from '../../components/MaterialUI';
import Items from '../Cart/Item/items';
import Card from '../../components/UI/Card';
import AddressForm from './AddressForm';
import './style.css';
import Price from '../Cart/Price/price';
import { useHistory } from 'react-router-dom';
import {toast, Zoom} from 'react-toastify';

/**
* @author
* @function CheckoutPage
**/

toast.configure();

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.locality} - ${adr.landmark}`}
            </div>
            {adr.selected && (
              <div style={{
                  width: '100%',
                  display: 'flex',
                  marginTop:'15px',
                  background: '#ffffff',
                  justifyContent: 'center',
                  boxSizing: 'border-box',}}
              > 
                <MaterialButton
                  title="DELIVERY HERE"
                  onClick={() => confirmDeliveryAddress(adr)}
                  style={{
                    width: "200px",
                    margin: "10px 0",
                  }}
                />
              </div>
              
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => { }}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {

  let history = useHistory();

  const checkout = useSelector((state) => state.checkout);
  const auth = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder,setConfirmOrder] = useState(false);
  const cart = useSelector((state) => state.cart);

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');


  const dispatch = useDispatch();

  useEffect(() => {
    auth.userAuthenticate && dispatch(getAddress());
    auth.userAuthenticate && dispatch(getCartItems());
  }, [auth.userAuthenticate]);

  useEffect(() => {
    const address = checkout.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [checkout.address]);

  const userAccountLogin = () => {
    if(mobile==='' && password===''){
      toast.dark("Enter Mobile Number and Password", {position:'top-center', transition:Zoom});
      return;
    }else{
      if(mobile===''){
        toast.dark("Enter Mobile Number",{position:'top-center', transition:Zoom});
        return;
      }else if(mobile!==''){
        if(isNaN(mobile)){
          toast.dark("Mobile Number must be Number(0-9)",{position:'top-center', transition: Zoom});
          return;
        }else if(mobile.length !==10){
          toast.dark("Enter 10 Digit mobile Number",{position:'top-center', transition: Zoom});
          return;
        }
      }
      if(password===''){
        toast.dark("Enter Password",{position:'top-center', transition: Zoom});
        return;
      }else{
        if(password.length < 6){
          toast.dark("Password Must be at least of 6 character",{position:'top-center', transition: Zoom});
          return;
        }
      }
    }
    const user = {
      mobile,
      password
    }
    dispatch(userLogin(user));
  }

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
    //console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );

    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      categoryId: cart.cartItems[key].category,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));

    const payload = {
      
      address_id : selectedAddress._id,
      address_name : selectedAddress.name,
      address_mobileNumber: selectedAddress.mobileNumber,
      address_pinCode: selectedAddress.pinCode,
      address_locality: selectedAddress.locality,
      address_address: selectedAddress.address,
      address_cityDistrictTown: selectedAddress.cityDistrictTown,
      address_state: selectedAddress.state,
      address_landmark: selectedAddress.landmark,
      address_alternatePhone: selectedAddress.alternatePhone,
      address_addressType: selectedAddress.addressType,

      totalAmount,
      items,
      paymentStatus: "PENDING",
      paymentType: "COD",
      orderStatus: "ORDERED"
    };
    
    console.log(payload);
    dispatch(addOrder(payload));
    setConfirmOrder(true);
    alert('Thank You, Your Order Received');
    history.push('/');
  };


  return (
    <>
    <Header />
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          {/* check if user logged in or not */}
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.userAuthenticate}
            body={
              auth.userAuthenticate ? (
                <div className="loggedInId">
                  <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                  <span style={{ margin: "0 5px" }}>{auth.user.mobile}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput 
                  label="Mobile Number"
                  placeholder="9811771892"
                  value={mobile}
                  type="text"
                  onChange={(e) => setMobile(e.target.value)}
                  />
                  <MaterialInput 
                  label="Password" 
                  placeholder="*********"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  />
                  <div style={{
                      width: '100%',
                      display: 'flex',
                      marginTop:'15px',
                      background: '#ffffff',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                  }}>
                    <div>
                      <span style={{
                        cursor:'pointer',
                        color:'#2874f0',
                        fontSize:'20px',
                      }} onClick={userAccountLogin}>Login</span>
                    </div>
                  </div>
                   
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && auth.userAuthenticate}
            body={
              <>
                {confirmAddress ? (
                  <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.mobileNumber}`}</div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />

          {/* AddressForm */}
          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : auth.userAuthenticate ? (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null}

          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
            body={
              orderSummary ? (
                <Items/>
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems).length} items
                </div>
              ) : null
            }
          />
          
          {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
                <div  className="flexRow" style={{
                  width: '100%',
                  display: 'flex',
                  marginBottom:'15px',
                  justifyContent: 'center',
                  boxSizing: 'border-box',}}>
                  {confirmAddress && !orderConfirmation? <div className="checkoutPrice"><Price/></div> : null}
                </div>
                <div className="flexRow" style={{
                  width: '100%',
                  display: 'flex',
                  marginBottom:'15px',
                  justifyContent: 'center',
                  boxSizing: 'border-box',}} >
                <MaterialButton
                    title="CONTINUE"
                    onClick={userOrderConfirmation}
                    style={{
                      marginTop:'20px',
                      width: "200px",
                    }}
                  />
                </div>
            </Card>
          )}

          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption && (
                <div>
                  <div
                    className="flexRow"
                    style={{
                      alignItems: "center",
                      padding: "20px",
                    }}
                  >
                    <input type="radio" name="paymentOption" value="cod" />
                    <div>Cash on delivery</div>
                  </div>
                  <MaterialButton
                    title="CONFIRM ORDER"
                    onClick={onConfirmOrder}
                    style={{
                      width: "200px",
                      margin: "0 0 20px 20px",
                    }}
                  />
                </div>
              )
            }
          />
        </div>
        
      </div>
    <Footer />
    </>
  );
};

export default CheckoutPage;