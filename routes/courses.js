const express = require("express");
const {Course} = require("../models")
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
//return all courses
router.get('/courses', asyncHandler(async(req,res)=>{
    const courses = await Course.findAll();
    res.status(200).json(courses);
}))

router.get('/courses/:id', asyncHandler(async(req,res)=>{
    const course = await Course.findByPk(req.params.id);
    res.status(200).json(course);
}))

router.post('/courses/:id',asyncHandler(async(req,res)=>{
    try{
        await Course.create(req.body)
    }catch(err){
        console.log("Error:",err)
    }
}))

router.put('/courses/:id',asyncHandler(async(req,res)=>{
    let course = await Course.findByPk(req.params.id);
    try{
       await Course.update(course);
       res.status(204).end();
    }catch(err){
        console.log("Error:",err)
    }
}))

module.exports = router