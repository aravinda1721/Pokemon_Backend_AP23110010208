const jwt = require('jsonwebtoken')
const User = require('../models/Auth_user')
const bcrypt = require('bcryptjs')
require('dotenv').config();

const auth = async(req,res,next)=>{

try{
    const authHeader = req.header("Authorization")

if(!authHeader){
return res.status(400).json({
    message:"Login required"
})
}

const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader

const decode = jwt.verify(
    token,
    process.env.JWT_SECRET
);

req.user= decode;
next();

}catch(err){
    res.status(401).json({
        message:"Token is invalid"
    })
}
}

module.exports  = auth