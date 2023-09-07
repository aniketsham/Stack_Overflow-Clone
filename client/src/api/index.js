import axios from 'axios';

const API=axios.create({baseURL:'https://stack-overflow-clone-uev0.onrender.com'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("Profile")){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
    }
    return req;
})
export const logIn=(authData)=>API.post('/user/login',authData);
export const signUp=(authData)=>API.post('/user/signup',authData);

export const postQuestion=(questionData)=>API.post('/questions/Ask',questionData)
export const getAllQuestions=()=>API.post('/questions/get');
export const voteQuestion=(id,value,userId)=>API.patch(`/questions/vote/${id}`,{value,userId})
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered,userId) =>API.post(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered,userId });
export const deleteQuestion=(id)=>API.delete(`/questions/delete/${id}`)
export const deleteAnswer=(id,answerId,noOfAnswers,userId)=>API.post(`/answer/delete/${id}`,{answerId,noOfAnswers,userId})

export const fetchAllUsers=()=>API.post('/user/getAllUsers')
export const updateProfile=(id,updateData)=>API.post(`/user/update/${id}`,updateData)
export const forgotPassword=(authData)=>API.post('/user/forgotpassword',authData)
export const verifyToken=(authData)=>API.post(`/user/verifyToken`,authData)
export const orderPayment=(subsValue)=>API.post(`/user/order/${subsValue}`)
export const capturePayment=(paymentId)=>API.post(`/user/capture`,paymentId)
export const setSubsDetails=(id,subsValue)=>API.post(`/user/setSubsDetails/${id}`,subsValue)
