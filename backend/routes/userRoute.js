const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User=require("../models/userModel");
//inbuilt middleware for json data
app.use(express.json());
const router=express.Router();

//create operations
router.post("/",async(req,res)=>{
    const {name,email,age}=req.body;
    try {
        const userAdded=await User.create({
            name:name,
            email:email,
            age:age
        });
        //show kro data
        res.status(200).json({ data: userAdded});

        
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
    
});
// hun get operation 
router.get("/",async (req,res)=>{
    
    try {
        const showalldata= await User.find();
        res.status(200).json({
            Alldata: showalldata
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

//get single user
router.get("/:id",async (req,res)=>{
    const {id}=req.params;//url se id bahr nikalne k liye hai
    try {
        const singleuser= await User.findById({_id : id});
        res.status(200).json({
            data: singleuser
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});
//dleete
router.delete("/:id",async (req,res)=>{
    const {id}=req.params;//url se id bahr nikalne k liye hai
    try {
        const singleuser= await User.findByIdAndDelete({_id : id});
        res.status(200).json({
            data: singleuser
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

//put or updaet oopeation
router.put("/:id",async (req,res)=>{
    const {id}=req.params;//url se id bahr nikalne k liye hai
    // const {name,age,email}=req.body;
    try {
        const updateuser= await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({
            data: updateuser
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

module.exports=router;