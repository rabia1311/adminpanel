const express=require('express');
const router=express.Router()
const adminlogin=require("../Models/adminlogin")
const {body,validationResult}=require('express-validator')

router.post("/createuser",async(req,res)=>{
    try{
      await  adminlogin.create({
            email:req.body.email,
            password:req.body.password

        })
        res.json({sucess:true})
    } 
   
    catch(error){
        console.log(error)
        res.json({sucess:false})
    }
})
module.exports=router;