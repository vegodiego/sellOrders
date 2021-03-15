import React, {useEffect} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getSellOrders, updateCreate, setCurrentSellOrderId} from '../actionCreators';


const SellOrders = (props) => { 
  const notBucle = null;

  useEffect(() => {
    props.getSellOrders();
    props.updateCreate();
  }, [notBucle]);

  if (props.broken === true) {
    return <Redirect to="/broken" />
  }

  return (
    <div className="container">
      <div className={props.sellOrderAdded === false ? "d-none": "float-right alert alert-success position-fixed"}>Sell order added.</div>
      <h2 className="text-center mt-3">Sell orders</h2>
      <Link to="/new" type="button" className="btn btn-success mt-3">&#43; Add sell order</Link>          
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Sell order number</th>
            <th>Seller store</th>
            <th>Creation date</th>
            <th>Shipping method</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.sellOrders.map((sellOrder,index) =>
            <tr>
              <td className="align-middle">{sellOrder.external_order_number}</td>
              <td className="align-middle">{sellOrder.seller_store}</td>
              <td className="align-middle">{sellOrder.date}</td>
              <td className=" align-middle">{sellOrder.shipping_method}</td>
              <td className="text-center pr-5">
                <Link to = {"/show/"+sellOrder.id} type="button" onClick={() => props.setCurrentSellOrderId(sellOrder.id)}  className="btn btn-primary">Show</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className={props.sellOrders.length === 0 ? "": "d-none"}>No sell orders</div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    sellOrders: state.sellOrders,
    broken: state.broken,
    sellOrderAdded: state.sellOrderAdded
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSellOrders(){
      dispatch(getSellOrders());
    },
    updateCreate(){
      dispatch(updateCreate());
    },
    setCurrentSellOrderId(id){
      localStorage.setItem('currentSellOrderId', id);
      dispatch(setCurrentSellOrderId());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SellOrders);