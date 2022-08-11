const express = require("express");
const User = require("./models/User");
const router = express.Router();

function asyncHandler (cb){
    return async(req,res,next)=>{
        try{
            await cb(req,res,next)
        }
        catch(error){
            res.status(500).send(error);
        }
    }
}

router.get('/users', asyncHandler(async(req,res)=>{
    const users = await User.findAll();
    res.status(201).json(users)
}));

router.post('/users', asyncHandler(async(req,res)=>{
    try{
        await User.create(req.body);
        res.status(201).set({
            'location':"/"
        })

    }catch(error){
        console.log("Error:",error)
    }
}))

module.exports = router;