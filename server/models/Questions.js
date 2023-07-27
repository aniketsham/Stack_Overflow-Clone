import mongoose from 'mongoose'

const QuestionSchema=mongoose.Schema({
    questionTitle:{type:String,required:"Question must have a title"},
    questionBody:{type:String,required:"Question must have a Body"},
    questionTags:{type:[String],required:"Question must have a tags"},
    noOfAnswers:{type:String,default:0},
    upVote:{type:[String],default:[]},
    downVote:{type:[String],default:[]},
    userPosted:{type:String,required:"Question must have author"},
    userId:{type:String},
    askedOn:{type:Date,default:Date.now()},
    answer:[{
        answerBody:String,
        userAnswered:String,
        userId:String,
        answered:{type:Date,default:Date.now()}

    }]

})

export default mongoose.model("Questions",QuestionSchema)