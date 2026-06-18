const Pokemon = require('../models/Pokemon')
const cloudinary = require("cloudinary").v2
const fs = require('fs')
require('dotenv').config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

exports.addpokemon = async (req,res)=>{
try{

  const result = await cloudinary.uploader.upload(
    req.file.path,
    {
        folder: "store"
    }
  )

  if(req.file && req.file.path && fs.existsSync(req.file.path)){
    fs.unlinkSync(req.file.path)
  }

 const pokemon = await Pokemon.create({
    name:req.body.name,
    height:req.body.height,
    weight:req.body.weight,
    base_exp:req.body.base_exp,
    game_index:req.body.game_index,
    image:result.secure_url
 });

 res.status(201).json({
    message: "pokemon added",
    pokemon
 })

}catch(err){
    // Clean up file if upload failed
    if(req.file && req.file.path && fs.existsSync(req.file.path)){
      fs.unlinkSync(req.file.path)
    }
    res.status(500).json({
    message: err.message || "Error adding pokemon"
 })
}
}

exports.getallpoke = async (req,res)=>{
    
    try{

        const pokemon = await Pokemon.find()
        res.status(201).json({
    message: "Pokemons ",
    pokemon
 })

    }catch(err){
res.status(500).json({
    message: err,
    
 })
}
}

exports.getbyidpoke = async (req,res)=>{
    
    try{

        const pokemon = await Pokemon.findById(req.params.id)

        res.status(201).json({
    message: "Pokemon ",
    pokemon
 })

    }catch(err){
res.status(500).json({
    message: err,
    
 })
}
}

exports.updatepoke = async (req,res)=>{
    try{
        const pokemon = await Pokemon.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new : true,
                runValidators : true,
            }
        )
        res.status(201).json({
            message: "details of pokemon ",
            pokemon

    })
    }
    catch(err){
        res.status(500).json({
    message: err.message,
    })
}
}

exports.deletepoke = async (req,res)=>{
    try{
        const pokemon = await Pokemon.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "Pokemon deleted successfully",
            pokemon
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message,
        })
    }
}

exports.deletepoke= async(req,res)=>{
    try{

        const pokemon = await pokemon.findByIdAndDelete(req.params.id)
        res.status(201).json({
    message: " pokemon deleted ",
   
 })

    }catch(err){
res.status(500).json({
    message: err,
    
 })
}
}