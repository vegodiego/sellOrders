import '../stylesheets/show.css';
import React, {useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setData} from '../actionCreators';


const Show = (props) => {
  const notBucle = null;

  useEffect(() => {
    props.setData(props.currentSellOrderId);
  },[notBucle]); 

  if (props.broken === true) {
    return <Redirect to="/broken" />
  }

  return (
    <div className="container">
      <div className="row m-3">
        <div className="card p-0 col-10 col-lg-5" >
          <h3 className="card-header text-center">Order {props.externalOrderNumber}</h3>
          <div className="card-body">
            <div>
              <b className="font-weight-bold">Order information</b>
              <ul>
               <li>External order number: {props.externalOrderNumber}</li>
               <li>Buyer full name: {props.buyerFullName}</li>
               <li>Buyer phone number: {props.buyerPhoneNumber}</li>
               <li>Buyer email: {props.buyerEmail}</li>
              </ul>
            </div>
            <div>
              <b className="font-weight-bold">Shipping info</b>
              <ul>
               <li>Shipping address: {props.shippingAddress}</li>
               <li>Shipping city: {props.shippingCity}</li>
               <li>Shipping region: {props.shippingRegion}</li>
               <li>Shipping country: {props.shippingCountry}</li>
              </ul>
            </div>
            <div>
              <b className="font-weight-bold">Promise dates</b>
              <ul>
               <li>pack_promise_min: {props.packPromiseMin}</li>
               <li>pack_promise_max: {props.packPromiseMax}</li>
               <li>ship_promise_min: {props.shipPromiseMin}</li>
               <li>ship_promise_max: {props.shipPromiseMax}</li>
               <li>delivery_promise_min: {props.deliveryPromiseMin}</li>
               <li>delivery_promise_max: {props.deliveryPromiseMax}</li>
               <li>ready_pickup_promise_min: {props.readyPickupPromiseMin}</li>
               <li>ready_pickup_promise_max: {props.readyPickupPromiseMax}</li>
              </ul>
            </div>
            <div>
              <b className="font-weight-bold">Shipping info</b>
              <ul>
               <li>Product name: {props.productName}</li>
               <li>Product qty: {props.productQty}</li>
               <li>Product weight: {props.productWeight}</li>
              </ul>
            </div>
          </div>
        </div>  
      </div>
      <div className="row m-3">
        <div className="p-0">
          <Link to="/">Back</Link>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentSellOrderId: state.currentSellOrderId,
    broken: state.broken,
    externalOrderNumber: state.externalOrderNumber,
    buyerFullName: state.buyerFullName,
    buyerPhoneNumber: state.buyerPhoneNumber,
    buyerEmail: state.buyerEmail,
    shippingAddress: state.shippingAddress,
    shippingCity: state.shippingCity,
    shippingRegion: state.shippingRegion,
    shippingCountry: state.shippingCountry,
    productName: state.productName,
    productQty: state.productQty,
    productWeight: state.productWeight,
    packPromiseMin: state.packPromiseMin,
    packPromiseMax: state.packPromiseMax,
    shipPromiseMin: state.shipPromiseMin,
    shipPromiseMax: state.shipPromiseMax,
    deliveryPromiseMin: state.deliveryPromiseMin,
    deliveryPromiseMax: state.deliveryPromiseMax,
    readyPickupPromiseMin: state.readyPickupPromiseMin,
    readyPickupPromiseMax: state.readyPickupPromiseMax
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setData(id){
      dispatch(setData(id));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Show);