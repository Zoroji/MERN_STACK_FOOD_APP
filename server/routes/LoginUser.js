const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = "MyNameIsRajNayalIAmFocusedAndDeterminedToWorkAsAWebDev";

router.post('/login',async(req,res)=>{
   
    try{
    let userData = await User.findOne({email:req.body.email});
        if(!userData){
           return  res.json({msg:"user does not exist"})
        }
       const passwordCompare =await bcrypt.compare(req.body.password,userData.password);
       
    if(!passwordCompare){
        return res.json({msg:"incorrect password"})
    }
    const data = {
        user:{
            id:userData.id,
        }
    }
    const authToken = jwt.sign(data,jwtSecret);
    res.json({msg:"login success",authToken:authToken})


    }catch(err){
        console.log(err);
    }
    
});

module.exports = router;