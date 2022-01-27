
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;
const message = process.env.SERVER_NAME || 'Hello World!';


app.use(express.static('public'))
app.use(bodyParser.json({ limit: '50mb' }));


app.get('/', (req, res) => res.send(message));





// ==================================================== BRAINTREE ====================================================


const braintreeSCU = require('./braintree/braintree-subscription-create-upsell')
app.use('/braintree-subscription-create-upsell', braintreeSCU)

const braintreeCC = require('./braintree/create-customer-charge')
app.use('/create-customer-charge-braintree', braintreeCC)

const braintreeOI = require('./braintree/braintree-orders-initial')
app.use('/braintree-orders-initial', braintreeOI)

const braintreeUS = require('./braintree/braintree-upsell')
app.use('/braintree-charge-customer-upsell', braintreeUS)






app.listen(port, () => console.log(`Server listening on port: ${port}`));