import React,{useState} from 'react'
import icon from '../../assets/icon.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './Auth.css'
import { forgotpassword } from '../../actions/auth'
const ForgotPassword = () => {
    const [email,setEmail]=useState('')
    const [isFp,setIsFp]=useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleSubmit=(e)=>{
        e.preventDefault()
        if (!email){
            alert("Enter a email address")
        }
        dispatch(forgotpassword({email,}, navigate));
        

    }
  return (
    <div>
        <section class="auth-section">
            <div class="auth-container-2">
             <img src={icon} alt="Stack Overflow icon" className="login-logo"/>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <h4>
                            Email
                        </h4>
                        <input type="email" name="email" placeholder='Enter your email' id="email" onChange={(e)=>{setEmail(e.target.value)}}></input>
                    </label>
                    {
                        !isFp && (
                            <label htmlFor="check">
                                <p style={{color:"#666767" , fontSize:"13px"}}>
                                    You recieve a link in the above mentioned email address<br/> for the generating a new password. 
                                    <br/>Please follow the neccesary steps and login again. 
                                </p>
                            </label>
                        )
                    }
                    <button type="submit" className="auth-btn">{isFp ? '': "Send Recovery Mail" }</button>
                    
                    
                </form>
               
            </div>
        </section>
     
    </div>
  )
}

export default ForgotPassword
