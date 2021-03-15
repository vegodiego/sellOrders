import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const reducer = (state,action) => {
  if(action.type === 'UPDATING_BROKEN'){ 
    return {
      ...state,
      broken: action.object
    }
  } else if( action.type === 'UPDATING_SELL_ORDERS'){ 
    return {
      ...state,
      sellOrders: action.object
    }
  } else if( action.type === 'UPDATING_SELL_ORDER_ADDED'){ 
    return {
      ...state,
      sellOrderAdded: action.object
    }
  } else if( action.type === 'UPDATING_CURRENT_SELL_ORDER'){
    return {
      ...state,
      currentSellOrderId: action.object
    }  
  } else if( action.type === 'UPDATING_REDIRECT_CREATE'){ 
    return {
      ...state,
      redirectCreate: action.object
    }
  } else if( action.type === 'UPDATING_SELLER_STORE'){ 
    return {
      ...state,
      sellerStore: action.object
    }
  } else if( action.type === 'UPDATING_SHIPPING_METHOD'){ 
    return {
      ...state,
      shippingMethod: action.object
    }
  } else if( action.type === 'UPDATING_EXTERNAL_ORDER_NUMBER'){ 
    return {
      ...state,
      externalOrderNumber: action.object
    }
  } else if( action.type === 'UPDATING_BUYER_FULL_NAME'){ 
    return {
      ...state,
      buyerFullName: action.object
    }
  } else if( action.type === 'UPDATING_BUYER_PHONE_NUMBER'){ 
    return {
      ...state,
      buyerPhoneNumber: action.object
    }
  } else if( action.type === 'UPDATING_BUYER_EMAIL'){ 
    return {
      ...state,
      buyerEmail: action.object
    }
  } else if( action.type === 'UPDATING_SHIPPING_ADDRESS'){ 
    return {
      ...state,
      shippingAddress: action.object
    }
  } else if( action.type === 'UPDATING_SHIPPING_CITY'){ 
    return {
      ...state,
      shippingCity: action.object
    }
  } else if( action.type === 'UPDATING_SHIPPING_REGION'){ 
    return {
      ...state,
      shippingRegion: action.object
    }
  } else if( action.type === 'UPDATING_SIHPPING_COUNTRY'){ 
    return {
      ...state,
      shippingCountry: action.object
    }
  } else if( action.type === 'UPDATING_PRODUCT_NAME'){ 
    return {
      ...state,
      productName: action.object
    }
  } else if( action.type === 'UPDATING_PRODUCT_QTY'){ 
    return {
      ...state,
      productQty: action.object
    }
  } else if( action.type === 'UPDATING_PRODUCT_WEIGHT'){ 
    return {
      ...state,
      productWeight: action.object
    }
  } else if( action.type === 'UPDATING_PACK_PROMISE_MIN'){ 
    return {
      ...state,
      packPromiseMin: action.object
    }
  } else if( action.type === 'UPDATING_PACK_PROMISE_MAX'){ 
    return {
      ...state,
      packPromiseMax: action.object
    }
  } else if( action.type === 'UPDATING_SHIP_PROMISE_MIN'){ 
    return {
      ...state,
      shipPromiseMin: action.object
    }
  } else if( action.type === 'UPDATING_SHIP_PROMISE_MAX'){ 
    return {
      ...state,
      shipPromiseMax: action.object
    }
  } else if( action.type === 'UPDATING_DELIVERY_PROMISE_MIN'){ 
    return {
      ...state,
      deliveryPromiseMin: action.object
    }
  } else if( action.type === 'UPDATING_DELIVERY_PROMISE_MAX'){ 
    return {
      ...state,
      deliveryPromiseMax: action.object
    }
  } else if( action.type === 'UPDATING_READY_PICKUP_PROMISE_MIN'){ 
    return {
      ...state,
      readyPickupPromiseMin: action.object
    }
  } else if( action.type === 'UPDATING_READY_PICKUP_PROMISE_MAX'){ 
    return {
      ...state,
      readyPickupPromiseMax: action.object
    }
  } 
  return state;
};


export default createStore(reducer, {
  broken: false, 
  sellOrders: [], 
  sellOrderAdded: false,
  currentSellOrderId: localStorage.getItem('currentSellOrderId'), 
  redirectCreate: false,  
  sellerStore: "", 
  shippingMethod: "",
  externalOrderNumber: "", 
  buyerFullName: "",
  buyerPhoneNumber: "", 
  buyerEmail: "",
  shippingAddress: "",
  shippingCity: "",
  shippingRegion: "",
  shippingCountry: "",
  productName: "",
  productQty: "",
  productWeight: "",
  packPromiseMin: "",
  packPromiseMax: "",
  shipPromiseMin: "",
  shipPromiseMax: "",
  deliveryPromiseMin: "",
  deliveryPromiseMax: "",
  readyPickupPromiseMin: "",
  readyPickupPromiseMax: ""
}, applyMiddleware(thunk)); 