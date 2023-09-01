import Questions from "../models/Questions.js";
import mongoose from "mongoose";
import users from "../models/auth.js";
import cron from 'node-cron';
export const AskQuestion = async (req, res) => {
  const postQuestionData = req.body;
  const _id=postQuestionData.userId
  const postQuestion = new Questions(postQuestionData);
  try {
    console.log(postQuestionData.userId)
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("question unavailable...");
    }
    var  existinguser = await users.findById(_id);
    var sub_id=existinguser.subscription[existinguser.subscription.length-1].subscription_Id
    const subsValue=existinguser.subscription[existinguser.subscription.length-1].subscription_Type
    const currentDate = new Date();

    if(existinguser.subscription[existinguser.subscription.length-1].expiry_Date>=currentDate){
      if(existinguser.subscription[existinguser.subscription.length-1].limit>0){
        const limit=parseInt(existinguser.subscription[existinguser.subscription.length-1].limit)-1
        console.log(limit)
        const updatedProfile=await users.findOneAndUpdate({_id:existinguser._id,'subscription.subscription_Id':sub_id},{$set:{ 'subscription.$.limit': limit }})
        console.log(updatedProfile)
        //const dec_limit = await users.findById(_id);
        //console.log(dec_limit)
        if (subsValue==="Free"){
          var new_Limit=1
        }
        else if (subsValue==="Silver"){
          var new_Limit=5
        }
        else{
          var new_Limit=99999999
        }
        if(existinguser.subscription[existinguser.subscription.length-1].limit===new_Limit){
        cron.schedule('0 0 * * *', async() =>{
          
        const updatedLimit= await users.findOneAndUpdate({_id:existinguser._id,'subscription.subscription_Id':sub_id},{$set:{ 'subscription.$.limit': new_Limit }})
        console.log(updatedLimit)});}
      
        await postQuestion.save();
        res.status(200).json({message:"Posted a question successfully"});
      }
      else{
        res.status(200).json("You have exceeded the limit to ask the question");
      }
    }
    else{
      const updatedLimit= await users.findOneAndUpdate({_id:existinguser._id,'subscription.subscription_Id':sub_id},{$set:{ 'subscription.$.subscription_Type':"Free",'subscription.$.limit': 1 }})
      console.log(updatedLimit)

      res.status(200).json("Your subscription has expired");

    }
    

  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't post a new question");
  }
};

export const getAllQuestions=async(req,res)=>{
  try {
   const questionList=await Questions.find()
   res.status(200).json(questionList)
  } catch (error) {
    res.status(404).json({message:error.message})
    
  }
}

export const deleteQuestion=async(req,res)=>{
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    await Questions.findByIdAndRemove(_id);
    res.status(200).json({message:'Succesfully Deleted ... '})
  } catch (error) {
    console.log({message:error.message})
    res.status(404).json({message:error.message})
  }
}

export const voteQuestion=async(req,res)=>{
    const {id:_id}=req.params;
    const {value,userId}=req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("question unavailable...");
    }
    try {
      const question=await Questions.findById(_id)
      const upIndex=question.upVote.findIndex((id)=>id==String(userId))
      const downIndex=question.downVote.findIndex((id)=>id==String(userId))

      if(value== 'upVote'){
        if(downIndex !== -1){
          question.downVote=question.downVote.filter((id)=>id !==String(userId))
        }
        if(upIndex === -1){
          question.upVote.push(userId)
        }
        else{
          question.upVote=question.upVote.filter((id)=>id !== String(userId))
        }
      }
      else  if(value== 'downVote'){
        if(upIndex !== -1){
          question.upVote=question.upVote.filter((id)=>id !==String(userId))
        }
        if(downIndex === -1){
          question.downVote.push(userId)
        }
        else{
          question.downVote=question.downVote.filter((id)=>id !== String(userId))
        }
      }
      await Questions.findByIdAndUpdate(_id,question)
      res.status(200).json({message:"Voted succesfully"})
    } catch (error) {
      res.status(404).json({message:error.message})
    }

}