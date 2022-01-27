const express = require('express');
const router = express.Router();
const braintree = require('braintree');
let CryptoJS = require('crypto-js');



router.post('/', (req, res, next) => {
  console.log(req.body)
    const { plgCustomer, amount, paymentMethodNonce, tokens, env } = req.body;
    const merchantId = "kdntjtckdrq892dr";
    const publicKey = "f4p23xc4dv7mn5c6";
    const privateKey = "bd365667d166ab06e2a463028f09587c";

  const gateway = new braintree.BraintreeGateway({
    environment: env ? braintree.Environment.Production : braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId,
    publicKey,
    privateKey
  });

  gateway.customer.create({
    firstName: plgCustomer.firstName,
    lastName: plgCustomer.lastName,
    email: plgCustomer.email,
    phone: plgCustomer.phone,
    paymentMethodNonce
  }, (err, customerresult) => {
    if(customerresult.success){
      gateway.transaction.sale({
        amount, // price
        customerId: customerresult.customer.id,
        options: {
          storeInVaultOnSuccess: true,
          submitForSettlement: true
        }
      }, (error, result) => {
          if (result) {
            res.send(result);
          } else {
            res.status(500).send(error);
          }
      });
    }
    // true
  
    
  });


  

});

module.exports = router;