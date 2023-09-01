import React, { useState } from 'react';
import { setSubsDetails } from '../../actions/users.js'
import "./razor.scss";
import Axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const Razor = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  var [subsValue,setSubsValue]=useState('')
  const User=useSelector((state)=>(state.currentUserReducer))
  const id =User?.result?._id
  const handlePayment=async()=>{
    
    const API_URL = 'https://stack-overflow-clone-uev0.onrender.com'
    
    const orderUrl = `${API_URL}/user/order/${subsValue}`;
    const response = await Axios.post(orderUrl);
    const { data } = response;
    
    const options = {
      key: process.env.RAZORPAY_KEY,
      name: "Stack Overflow",
      description: "Some Description",
      order_id: data.id,
      handler: async (response) => {
        try {
          
         const paymentId = response.razorpay_payment_id;
       
         if(paymentId){
          dispatch(setSubsDetails(id,{subsValue},navigate))

         }
         
         const url = `${API_URL}/user/capture`;
        const captureResponse = await Axios.post(url, {paymentId})
         console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
     rzp1.open();
   
}
  const buyFree=async(e)=>{
    e.preventDefault()
    subsValue="Free"
    dispatch(setSubsDetails(id,{subsValue},navigate))

    
  }
  
  const buySilver=async(e)=>{
     e.preventDefault()
     subsValue="Silver"
     handlePayment();
  
  }
  const buyGold=async(e)=>{
    e.preventDefault()
    subsValue="Gold"
     handlePayment();


  }
  return (<div>
<br/>
<br/>


<body>
<div class="container">
  <h1>Choose a Subscription Plan</h1>
 
  <div class="subscription basic">
  <form onSubmit={buyFree}>
    <div class="subscription-details">
      <h2>Free Plan</h2>
      <p>You can put up to 1 Question per day</p>
      <p>Free</p>
    </div>
    <input type="submit" value="Select"/>
    </form>
  </div>
  
  <div class="subscription standard">
    <form onSubmit={buySilver}>
    <div class="subscription-details">
      <h2>Silver Plan</h2>
      <p>You can put up to 5 Question per day</p>
      <p>&#8377; 100/month</p>
    </div>
    <input type="submit" value="Select"/>
    </form>
  </div>
  <div class="subscription premium">
  <form  onSubmit={buyGold}>
    <div class="subscription-details">
      <h2>Gold Plan</h2>
      <p>You will get unlimited access for asking a question</p>
      <p>&#8377;1000/month</p>
    </div>
    <input type="submit" value="Select"/>
    </form>
  </div>
</div>
</body>



</div>


  )
}

export default Razor;
