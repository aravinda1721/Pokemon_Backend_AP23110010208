const mongoose = require('mongoose')

const pokeSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    height:{
        type:Number,
    },
    weight:{
        type:Number,
    },
    base_exp:{
        type:Number,
    },
    game_index:{
        type:Number,
    },
    image:{
        type:String,
    },
    
})

module.exports = mongoose.model('Pokemon', pokeSchema)