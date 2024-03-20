import React from "react";
import { sendPasswordResetEmail} from 'firebase/auth';
import BackArrow from "../utilityComponents/buttons/BackArrow";
import {auth} from '../../firebase';
import {useState } from 'react';
import { useNavigate } from "react-router-dom";
import SubmitButton from "../utilityComponents/buttons/SubmitButton";
import {BiSwim} from 'react-icons/bi'
import  "./css/signInPage.css";
import '../general.css'
import "./css/createAccount.css"
import './css/forgot.css'

const ForgotPassword = (props) => {

    const [submit, setSubmit] = useState(<SubmitButton css={'submitGreyOut'} function={null}/>);
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    
    const navigate = useNavigate();

    /**
     * 
     * @param {String} email string of the email that will be sent for the reset
     */
    const sendReset = async (email) => {

        try{
            await sendPasswordResetEmail(auth,email);
            navigate('/');
        } catch (error){
            setSubmit(<SubmitButton css={'error-red hover'} function={() => sendReset(email)}/>)
            const errorCode = error.code;

            if(errorCode === 'auth/user-not-found'){
                setErrorMessage(<p className="error-txt">User not found please try another email.</p>);
            } else if(errorCode === 'auth/invalid-email') {
                setErrorMessage(<p className="error-txt">Invalid email please try again.</p>);
            } else {
                setErrorMessage(<p className="error-txt">Unknown error please try again.</p>);
            }

        }      
    }

    const checkSubmit = (email) => {

        if(email.includes('.') && email.includes('@')){
            setSubmit(<SubmitButton css={'submitAllow hover'} function={() => sendReset(email)}/>)
        } else {
            setSubmit(<SubmitButton css={'submitGreyOut'} function={null}/>);
        }
    }

    return(
        <div id="insideBackground" className="centerSpace flex-start" >
            <BackArrow func={props.nav} size={25}/>
            <BiSwim className="swim-icon"/>
               <h2 className="sign-in-label">Password reset</h2>
               
               <form className="centerSpace flex-start" >        
                    <label className="labelInfo">
                    Enter the email associated with your account.
                    </label>
                    <input className="input-spacing" type="text" value={email} onChange={e => {setEmail(e.target.value); checkSubmit(e.target.value)}} /> 
                    {submit}    
               </form>
               {errorMessage}
              
           
           </div>
    );
}




export default ForgotPassword;