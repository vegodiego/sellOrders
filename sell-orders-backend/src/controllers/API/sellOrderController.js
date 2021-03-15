const axios = require('axios');
const helpers = require('../../helpers');


var dataBase = []

exports.sellOrders = async (req, res, next) => {
  try { 
    const sellOrders = dataBase;

    res.json(sellOrders);
  } catch(err){ 
    return next(err); 
  }
};

exports.show = async (req, res, next) => {
  try {
    const sellOrder = dataBase.filter((i)=> i.id == req.params.id)[0];

    res.json(sellOrder);
  } catch(err){ 
    return next(err); 
  }
};

exports.newSellOrder = async (req, res, next) => {
  try {
    if(dataBase.length === 0){ //set id
      var nextId = 1
    } else{
      var nextId = dataBase[dataBase.length-1].id + 1
    }

    var now_datetime = new Date(); //set current date
    var day = now_datetime.getDate()
    var month = now_datetime.getMonth() + 1
    var year = now_datetime.getFullYear()
    if(month < 10){
      var date = `${year}-0${month}-${day}`
    }else{
      var date = `${year}-${month}-${day}`
    }

    var randomNumber = Math.floor(Math.random()*101); //set internal_order_number
    var internal_order_number = "MSE"+Date.now()+randomNumber

    const data = {
      id: nextId,
      date: date,
      internal_order_number: internal_order_number,
      seller_store: req.body.sellerStore,
      shipping_method: req.body.shippingMethod,
      external_order_number: req.body.externalOrderNumber,
      buyer_full_name: req.body.buyerFullName,
      buyer_phone_number: req.body.buyerPhoneNumber,
      buyer_email: req.body.buyerEmail,
      shipping_address: req.body.shippingAddress,
      shipping_city: req.body.shippingCity,
      shipping_region: req.body.shippingRegion,
      shipping_country: req.body.shippingCountry,
      product_name: req.body.productName,
      product_qty: req.body.productQty,
      product_weight: parseInt(req.body.productWeight)
    };

    var shippingMethod;
    var offDays;
    var promises;

    axios.get('https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/shipping-methods/'+req.body.shippingMethodId,{
      headers: { 
        'x-api-key': 'oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT'
      }
    }) 
      .then(response => {
        shippingMethod = response.data;
        return axios.get('https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/off-days',{ 
          headers: { 
            'x-api-key': 'oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT'
          }
        }) 
      })
      .then(response =>{
        offDays = response.data;
        promises = helpers.setPromises(shippingMethod, offDays, data.product_weight);
        for (var i in promises){
          data[i] = promises[i]
        }
        dataBase.push(data);

        res.json({'sellOrder':data, 'error':'false'});
      })
      .catch(err => {
        console.log(err);
      })
  } catch(err){ 
    return next(err); 
  }
};