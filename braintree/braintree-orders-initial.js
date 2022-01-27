const express = require('express');
var request = require("request-promise");
const router = express.Router();
require('dotenv').config();

router.post('/', (req, res, next) => {

        console.log("Save to DB ", req.body)
    
        // save to db
        res.sendStatus(200);
      

 
});

module.exports = router;