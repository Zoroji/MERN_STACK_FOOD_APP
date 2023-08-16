const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {body,validationResult} = require('express-validator')
const bcrypt = require('bcrypt');


router.post('/createuser',
    body('email',"a valid email required").isEmail(), 
    body('password',"password must have a length of min 5").isLength({min:5}),
    body('name',"name must have a length of min 5").isLength({min:5}),
   async (req,res)=>{
        const err = validationResult(req);
        if(!err.isEmpty())
        {
           return res.status(400).json({error:err.array()});
        }

        let salt = await bcrypt.genSalt(10);
        let securePassword = await bcrypt.hash(req.body.password,salt);
    try{
       let userData =await  User.findOne({email:req.body.email});
       if(userData){
        return res.json({err:"user already exist!!!"})
       }
        User.create({
            name:req.body.name,
            password:securePassword,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true});
    }
    catch(err){
        console.log(err);
        res.json({success:false});
    }
})


module.exports = router;