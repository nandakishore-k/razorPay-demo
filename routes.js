//route folder is not working now, i decided to  go on without it

const express = require('express');
const router = express.Router();
const {createOrder,verifyPayment} = require('server');

router.post('/create-order',createOrder);

router.post('/verify-payment',verifyPayment);

router.get('/',(req,res) => {
    res.sendFile('public/index.html',{root: __dirname});
    
})

