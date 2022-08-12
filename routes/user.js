const express = require("express");
const {User} = require("../models");
const router = express.Router();

function asyncHandler(cb){
    return async (req,res,next) =>{
        try{
            await cb(req,res,next)
        }
        catch(err){
            next(err);
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

    }catch(err){
        console.log("Error:",err)
    }
}))

module.exports = router;