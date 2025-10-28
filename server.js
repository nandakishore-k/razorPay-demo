const express  = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config(); 

const app = express();
app.use(express.json());
app.use(express.static('public'));




const razorPay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

app.post('/create-order', async (req,res)=> {

        try{

        const options = {
            amount: 50000,
            currency: "INR",
            receipt: "receipt#1",
            notes: {
                key1: "value3",
                key2: "value2"
            }
            };

        const order = await razorPay.orders.create(options);
        console.log(order);
        res.json(order);
        }
        catch(err){
            console.error(err)
        }

})

app.post('/verify-payment', async (req,res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature == razorpay_signature) {
    console.log("payment succesful");
    res.json({"status" : "success"});
  }
  else{
    console.log("payment failed");
    res.json({"status" : "failed"});
  }
})


app.get('/',(req,res) => {
    res.sendFile('public/index.html',{root: __dirname});
    
})

app.listen(3000);