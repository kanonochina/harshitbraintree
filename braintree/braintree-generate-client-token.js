const express = require('express');
const router = express.Router();
const braintree = require('braintree');
let CryptoJS = require('crypto-js');



router.get('/', (req, res, next) => {
  // console.log(req.body)
  //   const {merchantId, publicKey, privateKey } = JSON.parse(decode(tokens))

  const gateway = new braintree.BraintreeGateway({
    // environment: env === 'true' ? braintree.Environment.Production : braintree.Environment.Sandbox,
    environment: braintree.Environment.Production ,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: '74hbc8ncbfp49tcd',
    publicKey: '643c5q7dk5y6j83h',
    privateKey: 'c34b32b24ff92695b16af9aa10d92031'
  });

  gateway.clientToken.generate({
    customerId: '09277'
  }, (err, response) => {
    // pass clientToken to your front-end
    const clientToken = response.clientToken
    res.send(clientToken);
  });
});

module.exports = router;