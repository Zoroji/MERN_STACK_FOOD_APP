const express = require('express');
const router = express.Router();
const Orders = require('../models/Orders');   

router.post('/orders', async (req, res) => {
  
    let data = req.body.foodOrderData;
    data.splice(0, 0, { Order_date: new Date() });

    const emailExist = await Orders.findOne({ email: req.body.email });

    if (!emailExist) {
        try {
            await Orders.create({
                email: req.body.email,
                foodOrderData: [data],
            }).then(() => { res.json({ success: true }) })
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
    else {
        try {
            await Orders.findOneAndUpdate({ email: req.body.email },
                {
                    $push: { foodOrderData: [data] }
                })
                .then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
})

router.post('/checkout', async (req, res) =>{

    try {
        let myData = await Orders.findOne({email:req.body.email})
        
        res.json({orderData:myData})
    } catch (error) {
       console.log(error);
    }

})




module.exports = router;