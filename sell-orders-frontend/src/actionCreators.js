import axios from 'axios';


const updateBrokenTrue = () =>{
  return{
    type: "UPDATING_BROKEN",
    object: true
  }
}

const updateBrokenFalse = () =>{
  return{
    type: "UPDATING_BROKEN",
    object: false
  }
}

const getSellOrders = () =>{
  return dispatch => {
    return axios.get('http://localhost:4000/sellOrders') 
      .then(response => {
        dispatch ({
          type: 'UPDATING_SELL_ORDERS',
          object: response.data
        })
      })
      .catch(err => {
        dispatch ({
          type: "UPDATING_BROKEN",
          object: true
        })
        console.log(err);
      })
  }
}

const updateCreate = () =>{
  return dispatch => {
    dispatch ({
      type: 'UPDATING_REDIRECT_CREATE',
      object: false
    })
    dispatch ({
      type: 'UPDATING_SELLER_STORE',
      object: ''
    })
    dispatch ({
      type: 'UPDATING_SHIPPING_METHOD',
      object:''
    })
    dispatch ({
      type: 'UPDATING_EXTERNAL_ORDER_NUMBER',
      object: ''
    })
    dispatch ({
      type: 'UPDATING_BUYER_FULL_NAME',
      object: ''
    })
    dispatch ({
      type: 'UPDATING_BUYER_PHONE_NUMBER',
      object: ''
    })
    dispatch ({
      type: 'UPDATING_BUYER_EMAIL',
      object: ''
    })
    dispatch ({
      type: 'UPDATING_SHIPPING_ADDRESS',
      object:''
    })
    dispatch ({
      type: 'UPDATING_SHIPPING_CITY',
      object: ''
    })
    dispatch ({
      type: 'UPDATING_SHIPPING_REGION',
      object: ''
    })
    dispatch ({
      type: 'UPDATING_SIHPPING_COUNTRY',
      object: ''
    })
    dispatch ({
      type: 'UPDATING_PRODUCT_NAME',
      object: ''
    })

    dispatch ({
      type: 'UPDATING_PRODUCT_QTY',
      object: ''
    })
    dispatch ({
      type: 'UPDATING_PRODUCT_WEIGHT',
      object: ''
    })
    dispatch ({
      type: 'UPDATING_REDIRECT_SHOW',
      object: false
    })
  }
}

const setCurrentSellOrderId= () =>{
  return{
    type: "UPDATING_CURRENT_SELL_ORDER",
    object: localStorage.getItem('currentSellOrderId')
  }
}

const submitCreate = (sellerStore, shippingMethod, externalOrderNumber, buyerFullName, buyerPhoneNumber, buyerEmail, shippingAddress, shippingCity, shippingRegion, shippingCountry, productName, productQty, productWeight) =>{
  var shippingMethodId
  const options = ['Recogida @ Melonn - HOY', 'Recogida @ Melonn - Siguiente Dia Habil', 'Domicilio - Express - Local', 'Domicilio - Hoy - Local', 'Domicilio - Siguiente Dia Habil - Local', 'Envio Nacional']
  for(var i=0; i<options.length; i++){
    if(options[i] === shippingMethod){
      shippingMethodId = i+1;
      break
    }
  }

  return dispatch => { 
    axios.post('http://localhost:4000/sellOrders', {
      sellerStore: sellerStore,
      shippingMethod: shippingMethod,
      externalOrderNumber: externalOrderNumber,
      buyerFullName: buyerFullName,
      buyerPhoneNumber: buyerPhoneNumber,
      buyerEmail: buyerEmail,
      shippingAddress: shippingAddress,
      shippingCity: shippingCity,
      shippingRegion: shippingRegion,
      shippingCountry: shippingCountry,
      productName: productName,
      productQty: productQty,
      productWeight: productWeight,
      shippingMethodId: shippingMethodId
    })
      .then(response => {
        dispatch ({
          type: 'UPDATING_REDIRECT_CREATE', 
          object: true
        })
        dispatch ({
          type: 'UPDATING_SELL_ORDER_ADDED',
          object: true
        })
        setTimeout(() =>{ 
          dispatch ({
            type: 'UPDATING_SELL_ORDER_ADDED',
            object: false
          })
        }, 1000);
      })
      .catch(err => {
        dispatch ({
          type: "UPDATING_BROKEN",
          object: true
        })
        console.log(err);
      });
  }
}

const change = (event) =>{
  var data = {
    'sellerStore': 'UPDATING_SELLER_STORE',
    'shippingMethod': 'UPDATING_SHIPPING_METHOD',
    'externalOrderNumber': 'UPDATING_EXTERNAL_ORDER_NUMBER',
    'buyerFullName': 'UPDATING_BUYER_FULL_NAME',
    'buyerPhoneNumber': 'UPDATING_BUYER_PHONE_NUMBER',
    'buyerEmail': 'UPDATING_BUYER_EMAIL',
    'shippingAddress': 'UPDATING_SHIPPING_ADDRESS',
    'shippingCity': 'UPDATING_SHIPPING_CITY',
    'shippingRegion': 'UPDATING_SHIPPING_REGION',
    'shippingCountry': 'UPDATING_SIHPPING_COUNTRY',
    'productName': 'UPDATING_PRODUCT_NAME',
    'productQty': 'UPDATING_PRODUCT_QTY',
    'productWeight': 'UPDATING_PRODUCT_WEIGHT'
  }

  for(var i in data){
    if([event.target.name] == i){
      return{
        type: data[i],
        object: event.target.value
      }
    }
  }
}

const setData = (id) =>{
  return dispatch => {
    return axios.get('http://localhost:4000/sellOrders/'+id)
      .then(response => {
        dispatch ({
          type: 'UPDATING_SELLER_STORE',
          object: response.data.sell_store
        })
        dispatch ({
          type: 'UPDATING_SHIPPING_METHOD',
          object:response.data.shipping_method
        })
        dispatch ({
          type: 'UPDATING_EXTERNAL_ORDER_NUMBER',
          object: response.data.external_order_number
        })
        dispatch ({
          type: 'UPDATING_BUYER_FULL_NAME',
          object: response.data.buyer_full_name
        })
        dispatch ({
          type: 'UPDATING_BUYER_PHONE_NUMBER',
          object: response.data.buyer_phone_number
        })
        dispatch ({
          type: 'UPDATING_BUYER_EMAIL',
          object: response.data.buyer_email
        })
        dispatch ({
          type: 'UPDATING_SHIPPING_ADDRESS',
          object:response.data.shipping_address
        })
        dispatch ({
          type: 'UPDATING_SHIPPING_CITY',
          object: response.data.shipping_city
        })
        dispatch ({
          type: 'UPDATING_SHIPPING_REGION',
          object: response.data.shipping_region
        })
        dispatch ({
          type: 'UPDATING_SIHPPING_COUNTRY',
          object: response.data.shipping_country
        })
        dispatch ({
          type: 'UPDATING_PRODUCT_NAME',
          object: response.data.product_name
        })

        dispatch ({
          type: 'UPDATING_PRODUCT_QTY',
          object: response.data.product_qty
        })
        dispatch ({
          type: 'UPDATING_PRODUCT_WEIGHT',
          object: response.data.product_weight
        })
        
        dispatch ({
          type: 'UPDATING_PACK_PROMISE_MIN',
          object: response.data.pack_promise_min
        })
        dispatch ({
          type: 'UPDATING_PACK_PROMISE_MAX',
          object: response.data.pack_promise_max
        })
        dispatch ({
          type: 'UPDATING_SHIP_PROMISE_MIN',
          object: response.data.ship_promise_min
        })
        dispatch ({
          type: 'UPDATING_SHIP_PROMISE_MAX',
          object: response.data.ship_promise_max
        })
        dispatch ({
          type: 'UPDATING_DELIVERY_PROMISE_MIN',
          object: response.data.delivery_promise_min
        })
        dispatch ({
          type: 'UPDATING_DELIVERY_PROMISE_MAX',
          object: response.data.delivery_promise_max
        })
        dispatch ({
          type: 'UPDATING_READY_PICKUP_PROMISE_MIN',
          object: response.data.ready_pickup_promise_min
        })
        dispatch ({
          type: 'UPDATING_READY_PICKUP_PROMISE_MAX',
          object: response.data.ready_pickup_promise_max
        })
      })
      .catch(err => {
        dispatch ({
          type: "UPDATING_BROKEN",
          object: true
        })
        console.log(err);
      })
  }
}


export {updateBrokenTrue, updateBrokenFalse, getSellOrders, updateCreate, setCurrentSellOrderId, submitCreate, change, setData};