const {addpokemon,getallpoke,getbyidpoke,updatepoke,deletepoke} = require('../controller/pokeController')
const express = require("express")
const router = express.Router()
const multer = require("multer")
const auth = require('../middleware/authMiddleWare')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + "-"+ file.originalname)
    }
})

const upload = multer({
    storage
})


router.post("/add/pokemon",upload.single("image"),addpokemon)

router.get("/get/pokemon",auth,getallpoke)

router.get("/get/pokemon/:id",auth,getbyidpoke)

router.put("/update/pokemon/:id",auth,updatepoke)

router.delete("/delete/pokemon/:id",auth,deletepoke)

module.exports = router
