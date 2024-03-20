import  "./css/signInPage.css";
import '../general.css'
import "./css/createAccount.css"
import BackArrow from "../utilityComponents/buttons/BackArrow";
import _ from 'lodash';
import React from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../utilityComponents/buttons/SubmitButton";
import {BiSwim} from 'react-icons/bi'
import {useState } from 'react';
import {auth} from '../../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'



/**
 * Create account component placed in the SignInPage component
 * @returns CreateAccount component
 */
const CreateAccount = (props) => {

    // values for email, password and confirmed password
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordParams, setPasswordParams] = useState(['no-input','no-input','no-input','no-input','no-input']);
    const [submit, setSubmit] = useState(<SubmitButton css={'submitGreyOut'} function={null}/>);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    
    /**
     * Function called to create a new user in the firebase auth system
     */
    const createUserAccount = async  () => {
        try {
            // checks if the user credentials will create a new account
            await createUserWithEmailAndPassword(auth, document.getElementById("email").value, userPassword);
            // navigates back to homepage
            navigate('/');
        } catch(error){
            var errorCode = error.code;

            setSubmit(<SubmitButton css={'error-red hover'} function={() => createUserAccount()}/>)

            if(errorCode === 'auth/invalid-email'){
                setErrorMessage(<p className="error-txt">Invalid email please try again.</p>);
    
              } else if (errorCode === 'auth/email-already-in-use'){
                setErrorMessage(<p className="error-txt">This email is already in use. </p>)
              } else{
                setErrorMessage(<p className="error-txt">An error occurred pleas try again</p>)
              }
        }
      };
    

    /**
     * Determines if password fulfills requirements 
     * @param {string} password passes in a string of the password
     */
    const checkPassword = (password) => {
        
        let checkParams = ['need-param','need-param','need-param','need-param','need-param']
        // one or more character present will check password meets requirements 
        if( password.length > 0){
            
            if(/[a-z]/.test(password)){
                checkParams[0] = 'satisfied';
            }
            if(/[A-Z]/.test(password)){
                checkParams[1] = 'satisfied';
            }
            if(/[1-9]/.test(password)){
                checkParams[2] = 'satisfied';
            }
            if(/\W|_/g.test(password)){
                checkParams[3] = 'satisfied';
            }
            if(password.length >= 8){ 
                checkParams[4] = 'satisfied';
            }
            
            setPasswordParams(checkParams);
            
            checkSubmit(password,confirmPassword,checkParams,userEmail)
        // No characters sets all values to grey
        } else {
            setPasswordParams(['no-input','no-input','no-input','no-input','no-input'])
            
                checkSubmit(password,confirmPassword,['no-input','no-input','no-input','no-input','no-input'],userEmail);
                
        }
        
    }
    

    /**
     * Checks if the two passwords match and lets the user submit there username and password
     * @param {string} password this is the confirm password
     */
    const checkSubmit = (password, confirmPassword, satisfied,email) => {
        
        // if no second password has been entered keep the submit button blank
        if(confirmPassword.length > 0 && password.length > 0 && email.length > 0){
            
            // checks if the two passwords match
            if( confirmPassword === password && _.isEqual(satisfied, ['satisfied', 'satisfied', 'satisfied', 'satisfied', 'satisfied'])){      

                setSubmit(<SubmitButton css={'submitAllow hover'} function={() => createUserAccount()}/>)
            // no match still can't submit
            } else{
                setSubmit(<SubmitButton css={'submitGreyOut'} function={null}/>)

            }
            // need to enter password
        } else{

            setSubmit(<SubmitButton css={'submitGreyOut'} function={(null)}/>) 
        }

    }


    return ( 
    <div id="insideBackground" className="centerSpace flex-start" >
        <BackArrow func={props.nav} size={25} />
        <BiSwim className="swim-icon"/>
         <h2 className="sign-in-label">Create Account</h2>
         <form className="centerSpace flex-start" >    
                       <label id="top-label-create" className="label-spacing">
                       Enter your email
                       </label>    
                       <input className="create-input-spacing" id="email" type="text" value={userEmail} onChange={e =>  {setUserEmail(e.target.value); checkSubmit(userPassword,confirmPassword,passwordParams,e.target.value);}} /> 
                       <label className="label-spacing">
                       Enter a password
                       </label>  
                       <input onChange={e => {setUserPassword(e.target.value); checkPassword(e.target.value);}} className="create-input-spacing" type="password" value={userPassword}  /> 
                       <div className="justifyRowStart">
                        <div>
                            <li className={passwordParams[0]}>
                            One lowercase letter
                            </li> 
                            <li className={passwordParams[1]}>
                            One uppercase letter
                            </li> 
                            <li className={passwordParams[2]}>
                            One number 
                            </li> 
                        </div>
                        <div>
                            <li className={passwordParams[3]}>
                            One special character 
                            </li> 
                            <li className={passwordParams[4]}>
                            At least 8 characters
                            </li> 
                        </div>
                       </div>
                       
                       <label className="label-spacing">
                       Confirm password
                       </label>     
                       <input className="create-input-spacing" type="password" value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value); checkSubmit(userPassword,e.target.value,passwordParams,userEmail);}} /> 
                       <div className="justifyRowStart">
                       </div>
                   {submit}
               </form>
               {errorMessage}
    </div>)
}

export default CreateAccount;