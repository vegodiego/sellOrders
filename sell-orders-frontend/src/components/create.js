import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {submitCreate, change} from '../actionCreators';


const Create = (props) => { 
  if (props.broken === true) {
    return <Redirect to="/broken" />
  }

  if (props.redirectCreate) {
    return <Redirect to='/' />
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10 col-lg-8">
          <h2 className="mb-4 text-center mt-3">Crate sell order</h2>
          <form onSubmit={(event) => props.submitCreate(props.sellerStore, props.shippingMethod, props.externalOrderNumber, props.buyerFullName, props.buyerPhoneNumber, props.buyerEmail, props.shippingAddress, props.shippingCity, props.shippingRegion, props.shippingCountry, props.productName, props.productQty, props.productWeight, event)} className="mb-5">
            <div className="form-group">
              <label htmlFor="sellerStore">Seller store:</label>
              <input type="text" className="form-control" value={props.sellerStore} onChange={props.change} name="sellerStore" id="sellerStore"></input>
            </div>
            <div className="form-group">
              <label htmlFor="shippingMethod">Shipping method:</label>
              <select className="form-control" value={props.shippingMethod} onChange={props.change} name="shippingMethod" id="shippingMethod">
                <option></option>
                <option value="Recogida @ Melonn - HOY">Recogida @ Melonn - HOY</option>
                <option value="Recogida @ Melonn - Siguiente Dia Habil">Recogida @ Melonn - Siguiente Dia Habil</option>
                <option value="Domicilio - Express - Local">Domicilio - Express - Local</option>
                <option value="Domicilio - Hoy - Local">Domicilio - Hoy - Local</option>
                <option value="Domicilio - Siguiente Dia Habil - Local">Domicilio - Siguiente Dia Habil - Local</option>
                <option value="Envio Nacional">Envio Nacional</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="externalOrderNumber">External order number:</label>
              <input type="text" className="form-control" value={props.externalOrderNumber} onChange={props.change} name="externalOrderNumber" id="externalOrderNumber"></input>
            </div>
            <div className="form-group">
              <label htmlFor="buyerFullName">Buyer fullName:</label>
              <input type="text" className="form-control" value={props.buyerFullName} onChange={props.change} name="buyerFullName" id="buyerFullName"></input>
            </div>
            <div className="form-group">
              <label htmlFor="buyerPhoneNumber">Buyer phone number:</label>
              <input type="tel" className="form-control" value={props.buyerPhoneNumber} onChange={props.change} name="buyerPhoneNumber" id="buyerPhoneNumber"></input>
            </div>
            <div className="form-group">
              <label htmlFor="buyerEmail">Buyer email:</label>
              <input type="email" className="form-control" value={props.buyerEmail} onChange={props.change} name="buyerEmail" id="buyerEmail"></input>
            </div>
            <div className="form-group">
              <label htmlFor="shippingAddress">Shipping address:</label>
              <input type="text" className="form-control" value={props.shippingAddress} onChange={props.change} name="shippingAddress" id="shippingAddress"></input>
            </div>
            <div className="form-group">
              <label htmlFor="shippingCity">Shipping city:</label>
              <input type="text" className="form-control" value={props.shippingCity} onChange={props.change} name="shippingCity" id="shippingCity"></input>
            </div>
            <div className="form-group">
              <label htmlFor="shippingRegion">Shipping region:</label>
              <input type="text" className="form-control" value={props.shippingRegion} onChange={props.change} name="shippingRegion" id="shippingRegion"></input>
            </div>
            <div className="form-group">
              <label htmlFor="shippingCountry">Shipping country:</label>
              <input type="text" className="form-control" value={props.shippingCountry} onChange={props.change} name="shippingCountry" id="shippingCountry"></input>
            </div>
            <div className="form-group">
              <label htmlFor="productName">Product name:</label>
              <input type="text" className="form-control" value={props.productName} onChange={props.change} name="productName" id="productName"></input>
            </div>
            <div className="form-group">
              <label htmlFor="productQty">Product qty:</label>
              <input type="text" className="form-control" value={props.productQty} onChange={props.change} name="productQty" id="productQty"></input>
            </div>
            <div className="form-group">
              <label htmlFor="productWeight">Product weight:</label>
              <input type="text" className="form-control" value={props.productWeight} onChange={props.change} name="productWeight" id="productWeight"></input>
            </div>
            <button type="submit" className="btn btn-info">Create sell order</button>
            <Link to="/" className="btn btn-info ml-2">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    broken: state.broken,
    redirectCreate: state.redirectCreate,
    sellerStore: state.sellerStore,
    shippingMethod: state.shippingMethod,
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
    productWeight: state.productWeight
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitCreate(sellerStore, shippingMethod, externalOrderNumber, buyerFullName, buyerPhoneNumber, buyerEmail, shippingAddress, shippingCity, shippingRegion, shippingCountry, productName, productQty, productWeight, event){
      event.preventDefault();
      dispatch(submitCreate(sellerStore, shippingMethod, externalOrderNumber, buyerFullName, buyerPhoneNumber, buyerEmail, shippingAddress, shippingCity, shippingRegion, shippingCountry, productName, productQty, productWeight))
    },
    change(event){
      dispatch(change(event));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Create);