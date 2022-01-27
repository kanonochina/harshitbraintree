const express = require('express');
const router = express.Router();
const braintree = require('braintree');
let CryptoJS = require('crypto-js');



router.post('/', (req, res, next) => {
  console.log(req.body)
    const { amount, tokens, refToken, env } = req.body;
    const merchantId = "kdntjtckdrq892dr";
    const publicKey = "f4p23xc4dv7mn5c6";
    const privateKey = "bd365667d166ab06e2a463028f09587c";

  const gateway = new braintree.BraintreeGateway({
    environment: env === 'true' ? braintree.Environment.Production : braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId,
    publicKey,
    privateKey
  });

  gateway.transaction.sale({
    paymentMethodToken: refToken,
    amount,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      // storeInVaultOnSuccess: true,
      submitForSettlement: true
    }
  }, (err, result) => {
    if (result) {
          res.send(result)
        } else {
          res.send(err)
        }
  });
});

module.exports = router;