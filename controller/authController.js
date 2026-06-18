const User = require('../models/Auth_user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.register = async(req,res)=>{
try{

    const extistinguser = await User.findOne({
        email:req.body.email
    })
    if(extistinguser){
       return res.status(400).json({
        message:"User already exists"
       })
    }
const hashpswrd = await  bcrypt.hash(req.body.password,10)

    const user = await User.create({
        name: req.body.name,
        email:req.body.email,
        password:hashpswrd
    })

    res.status(201).json({
    message: "Registered succesfully",
    user
 })

}catch(err){
    res.status(500).json({
        message: err.message
    })
}
}

exports.login = async (req,res)=>{
try{

    const user = await User.findOne({
        email:req.body.email
    })

    if(!user){
return res.status(400).json({
        message:"User not found"
       })
    }

    const isMatch = await bcrypt.compare(
        req.body.password,
        user.password
    )

    if(!isMatch){
  return res.status(400).json({
    message:"Invalid password"
  })
    }

    const token = jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )

    res.json({
         message: "Logged in successfully",
        token
    })

}catch(err){
    res.status(500).json({
        message: err.message
    })
}
}