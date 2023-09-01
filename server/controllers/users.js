import mongoose from "mongoose";
import users from "../models/auth.js";
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";
import crypto from 'crypto'
import bcrypt from "bcryptjs";
import cron from 'node-cron'
import schedule from 'node-schedule'
export const getAllUsers= async (req,res)=>{
    try {
        const allUsers= await users.find();
        const allUsersDetails=[]
        allUsers.forEach(users => {
            allUsersDetails.push({_id:users._id,name:users.name,about:users.about,tags:users.tags,joinedOn:users.joinedOn})
        });
        res.status(200).json(allUsersDetails);
    } catch (error) {
        res.status(200).json({message:error.message})
    }
}

export const updateProfile= async (req,res)=>{
    const {id: _id}=req.params;
    const {name,about,tags }=req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      
        return res.status(404).send("question unavailable...");
      }
    try{
       const updatedProfile=await users.findByIdAndUpdate(_id,{$set:{'name':name,'about':about,'tags':tags}},{new:true})
       res.status(200).json(updatedProfile)
    }
    catch(error){
        res.status(405).json({message:error.message})
    }
}


export const forgotPassword= async (req,res)=>{
    const { email } = req.body;

  try {
    const existinguser = await users.findOne({ email });
    
const makeToken = (email) => {
return crypto.randomBytes(32).toString("hex")
}

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "anikets2048@gmail.com",
    pass: "vcpjripkigivjxdg"
  }
});
var temp_token = makeToken(email);

console.log(temp_token)
const emailTemplate = ({ email, link }) => {
  if (!existinguser) {
  return `We received an account recovery request on Stack Overflow for ${email}, but that email does not exist in our records.If you meant to sign up for Stack Overflow, you can sign up here.`
}
else{
  
 return  `
  Hey ${email}
  Here's the login link you just requested:${link}`
}
  }
var mailOptions = {
    from: "anikets2048@gmail.com",
    text: emailTemplate({
      email,
      link: `http://localhost:3000/UpdatePassword/${existinguser._id}/${temp_token}`,
    }),
    to: email,
    subject: "Stack Overflow recovery email",
    
};
 async function add_token(_id){
  const uProfile=await users.findByIdAndUpdate(_id,{$set:{'temp_token':temp_token}},{new:true})
  console.log(uProfile)
}
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
  
    const {id:_id}=existinguser._id
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("question unavailable...");
    }
    console.log(existinguser._id)
      add_token(existinguser._id)
    console.log('Email sent: ' + info.response);
    res.status(200).json({"message":'Email sent: ' + info.response})
  }
});

    

}
catch(error){
    res.status(405).json({message:error.message})
}
}


export const verifyToken= async (req,res)=>{

  const {id,token,password}=req.body

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid user_id")
      return res.status(404).send("Invalid user");
    }
    const existinguser = await users.findOne({ _id:id });
    console.log(typeof(existinguser.temp_token))
    console.log(typeof(token))
    if (existinguser) {
      const temp_token=existinguser.temp_token
      if (temp_token===token){
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await users.findOneAndUpdate(
          { _id:id },
          { password: hashedPassword },
          { new: true }
        );
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        var message="You have succesfully changed your password please try and log now "

      }
      else{
        var message="Due to invalid credentials you have been restricted to make any changes to password"
      }
      return res.status(200).json(message);
    }
    else{
      res.status(405).json({message:error.message})
    }
  } catch (error) {
    res.status(405).json({message:error.message})
  }
  
}

export const setSubsDetails=async(req,res)=>{
  const {id: _id}=req.params;
  const {subsValue}=req.body;
  
  try {
    console.log(subsValue)
    var existinguser = await users.findOne({_id} );
    
    const makeToken = () => {
      return crypto.randomBytes(16).toString("hex")
      }
    const sub_id=makeToken()
    if (subsValue==="Free"){
      var limit=1;
    }
    else if (subsValue==="Silver"){
      var limit=5;
    }
    else{
      var limit=99999999;
    }
    
      if(existinguser.subscription.length==0){
        function addMonths(date, months) {
          const newDate = new Date(date);
          newDate.setMonth(newDate.getMonth() + months);
          return newDate;
        }
        
        const currentDate = new Date();
        const newDate = addMonths(currentDate, 1);
    const updatedProfile=await users.findByIdAndUpdate(_id,{$addToSet: { subscription:[{'subscription_Id':sub_id,'subscription_Type':subsValue,'limit':limit,'expiry_Date':newDate}]}})
    if(updatedProfile){
        var message={message:"subscribed"}
        
    }
    else{
      message={message:"due to some error we could subscribe"}
      }
      
      console.log(updatedProfile)
      res.status(200).json({ result: existinguser,message });
    }
    else{
      const existinguser1 = await users.findOne({_id} );
      function addMonths(date, months) {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + months);
        return newDate;
      }
      
      const currentDate = new Date();
      const newDate = addMonths(currentDate, 1);
      var already_Sub_Id=existinguser1.subscription[0].subscription_Id
      const updatedProfile=await users.findOneAndUpdate({_id:existinguser1._id,'subscription.subscription_Id':already_Sub_Id},{$set:{ 'subscription.$.subscription_Type':subsValue,'subscription.$.limit': limit,'subscription.$.expiry_Date':newDate }})
      console.log(updatedProfile)
      if(updatedProfile){
        var message={message:"subscribed"}         
    
      }
      else{
      message={message:"due to some error we could subscribe"}
      }
      console.log(updatedProfile)
      res.status(200).json({ result: existinguser,message });
    }
    //const updatedProfile=await users.findByIdAndUpdate(_id,{$addToSet: { subscription:[{'subscription_Id':sub_id,'subscription_Type':subsValue,'limit':limit}]}})
    
  }
  catch (error) {
    console.log(error.message)
  }
}