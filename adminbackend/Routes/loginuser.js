const express=require('express');
const router=express.Router()
const adminlogin=require("../Models/adminlogin")
const {body,validationResult}=require('express-validator')

router.post("/adminlogin",[body('email').isEmail(),
body('password','incorrect password').isLength({min:5})
],
async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
let email=req.body.email;
try {
   let userData= await adminlogin.findOne({email});
   if(!userData){
    return res.status(400).json({errors:" try logging in with correct credentials"})
   }
if (req.body.password !== userData.password){
    return res.status(400).json({errors:" try logging in with correct credentials"})

}
    res.json({success:true ,  message: "Login successful"})
} 


catch (error) {
    console.log(error)
    res.json({success:false})
}
})
module.exports=router;