const express = require('express');
const router = express.Router();
const MongoDB = require("../mongo");
 MongoDB();

router.post('/foodData',(req,res)=>{
    // console.log(global.foodItems);
    res.send([global.foodItems,global.foodCategory])
})

module.exports = router;