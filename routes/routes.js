const express = require("express");
const {User,Course} = require("../models");
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
    const user = req.currentUser;
    res.status(201).json(user)
}));

router.post('/users', asyncHandler(async(req,res)=>{
    try{
        await User.create(req.body);
        
        res.location('/');
        res.status(201).end();

    }catch(error){
        console.log("Error:",error.name)
    

    if(error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError"){
        const errors = error.errors.map(err => err.message);
        res.status(400).json({errors});
    }
    else{
        throw error
    }
}
}))
//-------------COURSES------------//

router.get('/courses', asyncHandler(async(req,res)=>{
    const courses = await Course.findAll();
    res.status(200).json(courses);
}))

router.get('/courses/:id', asyncHandler(async(req,res)=>{
    const course = await Course.findByPk(req.params.id);
    res.status(200).json(course);
}))

router.post('/courses',asyncHandler(async(req,res)=>{
    try{
        await Course.create(req.body)
        res.status(201).location(`/courses/${Course.id}`).end();
    }
    catch(error){
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
module.exports = router;