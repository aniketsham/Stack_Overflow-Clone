import React, {  useState } from 'react'
import icon from '../../assets/icon.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { verifytoken } from '../../actions/auth'

const ResetPassword = () => {
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    var  [resetPassword,setResetPassword]=useState(true)
    const navigate=useNavigate();
    const dispatch=useDispatch()

    const {id,token}=useParams()


    const handleSubmit=(e)=>{
        e.preventDefault();
        e.preventDefault();
        if (confirmPassword===password){
        dispatch(verifytoken({id,token,password},navigate))
        }
        else{
            alert("your confirm password and password doesnot match")
        }
    }
  return (
    <div>
        <section class="auth-section">
            <div class="auth-container-2">
             <img src={icon} alt="Stack Overflow icon" className="login-logo"/>
               {resetPassword && (<form onSubmit={handleSubmit}>
                
                    <label htmlFor="password">
                        <h4>
                            Password
                        </h4>
                        <input type="password" name="password" placeholder='Enter your Password' id="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
                    </label>
                    <label htmlFor="confirmpassword">
                        <h4>
                           Confirm Password
                        </h4>
                        <input type="confirmpassword" name="confirmpassword" placeholder='Enter your Confirm Password' id="cpassword" onChange={(e)=>{setConfirmPassword(e.target.value)}}></input>
                    </label>
                    {
                        (
                            <label htmlFor="check">
                                <p style={{color:"#666767" , fontSize:"13px"}}>
                                   After reseting your password please login again.
                                </p>
                            </label>
                        )
                    }
                    <button type="submit" className="auth-btn"> Change Password</button>
                    
                    
                </form>)} 

                {!resetPassword&&(
                    <>
                        <h1>Restricted Page</h1>
                        <p>
                            You dont have access to this page.
                        </p>

                    </>
                )}

                
               
            </div>
        </section>
     
    </div>
  )
}

export default ResetPassword
