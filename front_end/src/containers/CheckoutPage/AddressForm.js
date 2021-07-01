import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress } from '../../actions';
import { MaterialInput, MaterialButton } from '../../components/MaterialUI';

/**
* @author
* @function AddressForm
**/

const AddressForm = (props) => {
    const { initialData } = props;
    const [name, setName] = useState(initialData ? initialData.name : "");
    const [mobileNumber, setMobileNumber] = useState(
      initialData ? initialData.mobileNumber : ""
    );
    const [locality, setLocality] = useState(
      initialData ? initialData.locality : ""
    );
    const [address, setAddress] = useState(
      initialData ? initialData.address : ""
    );
    const [landmark, setLandmark] = useState(
      initialData ? initialData.landmark : ""
    );
    const [alternatePhone, setAlternatePhone] = useState(
      initialData ? initialData.alternatePhone : ""
    );
    const [addressType, setAddressType] = useState(
      initialData ? initialData.addressType : ""
    );
    const dispatch = useDispatch();
    const checkout = useSelector((state) => state.checkout);
    const [submitFlag, setSubmitFlag] = useState(false);
    const [id, setId] = useState(initialData ? initialData._id : "");
  
    const inputContainer = {
      width: "100%",
      marginRight: 10,
    };
  
    const onAddressSubmit = (e) => {

      if(name === ''|| mobileNumber === '' || locality===''|| address === ''){
        alert('Customer Name, Mobile Number, Locality and Adreess Must Be Provided!');
        return;
      }

      if(addressType===''){
        alert('Select Address Type');
        return;
      }

      const payload = {
        address: {
          name,
          mobileNumber,
          locality,
          address,
          landmark,
          alternatePhone,
          addressType,
        },
      };
      console.log(payload);
      if (id) {
        payload.address._id = id;
      }
      dispatch(addAddress(payload));
      setSubmitFlag(true);
    };
  
    useEffect(() => {
      console.log("addressCount", checkout.address);
      if (submitFlag) {
        console.log("where are we", checkout);
        let _address = {};
        if (id) {
          _address = {
            _id: id,
            name,
            mobileNumber,
            locality,
            address,
            landmark,
            alternatePhone,
            addressType,
          };
        } else {
          _address = checkout.address.slice(checkout.address.length - 1)[0];
        }
  
        props.onSubmitForm(_address);
      }
    }, [checkout.address]);
  
    const renderAddressForm = () => {
      return (
        <>
          <div className="flexRow">
            <div style={inputContainer}>
              <MaterialInput
                placeholder="Ram Bilas"
                label="Customer Name is Required"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div style={inputContainer}>
              <MaterialInput
                placeholder="9817769120"
                label="Mobile Number is Required"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flexRow">
            <div style={inputContainer}>
              <MaterialInput
                placeholder="Lahan-08"
                label="Address With Ward No. is Required"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div style={inputContainer}>
              <MaterialInput
                label="Locality or Street Name is Required"
                placeholder="Pashupati Ma. Bi. Agadi"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
              />
            </div>
          </div>
  
          <div className="flexRow">
            <div style={inputContainer}>
              <MaterialInput
                label="Landmark is Optional"
                placeholder="NIC ASIA Building, Top Floor"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              />
            </div>
            <div style={inputContainer}>
              <MaterialInput
                label="Alternate Phone Number is Optional"
                placeholder="9827733112"
                value={alternatePhone}
                onChange={(e) => setAlternatePhone(e.target.value)}
              />
            </div>
          </div>
          <div style={{
            marginTop:'20px',
            marginLeft:'25px'
          }}>
            <label>Address Type</label>
            <div className="flexRow">
              <div>
                <input
                  type="radio"
                  onClick={() => setAddressType("home")}
                  name="addressType"
                  value="home"
                />
                <span>Home</span>
              </div>
              <div>
                <input
                  type="radio"
                  onClick={() => setAddressType("work")}
                  name="addressType"
                  value="work"
                />
                <span>Work</span>
              </div>
            </div>
          </div>
          <div className="flexRow" style={{
                  width: '100%',
                  display: 'flex',
                  marginTop:'15px',
                  background: '#ffffff',
                  justifyContent: 'center',
                  boxSizing: 'border-box',}} >
            <MaterialButton
              title="SAVE AND DELIVER HERE"
              onClick={onAddressSubmit}
              style={{
                width: "220px",
                marginTop:'15px',
              }}
            />
          </div>
        </>
      );
    };
  
    if (props.withoutLayout) {
      return <div style={{width:"90%"}}>{renderAddressForm()}</div>;
    }
  
    return (
      <div className="checkoutStep" style={{ background: "#f5faff" }}>
        <div className={`checkoutHeader`}>
          <div>
            <span className="stepNumber">+</span>
            <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
          </div>
        </div>
        <div
          style={{
            paddingBottom: "20px",
            boxSizing: "border-box",
          }}
        >
          {renderAddressForm()}
        </div>
      </div>
    );
  };
  
  export default AddressForm;