import React from "react";
import '../general.css'
import './css/signInPage.css'
import {useState } from 'react';
import {BiSwim} from 'react-icons/bi'
import {FcGoogle} from 'react-icons/fc'
import {auth} from '../../firebase'
import ExitButton from "../utilityComponents/buttons/ExitButton";
import { useNavigate } from "react-router-dom";
import {signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword} from 'firebase/auth'


const SingIn = (props) => {


// sets username information 
const [userName, setUserName] = useState('');
const [userPassword, setUserPassword] = useState('');
const [loginError, setError] = useState('noShow');
const [switchError, setSwitch] = useState(true);

const navigate = useNavigate();


// uses google auth to login user if they have a google account
const googleAuthProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
await signInWithPopup(auth,googleAuthProvider);
navigate('/');
}

// login user with email and password they created
const sigInWithEaP = async () => {
   
   try{
   
   // sign user in with email and password with google authentication 
   await signInWithEmailAndPassword(auth, userName, userPassword)
   }
   // error if username does not exist or password is wrong
   catch(e){
       if(switchError){
           // set error message class name has to be changed every time to refresh shake
           setError('error-message-background show centerSpace horizontal-shaking error error-animation');
       } else {
           setError('error-message-background show centerSpace horizontal-shaking error error-animation2');
       }
       // toggle switch for css replacement
       setSwitch(!switchError)
   }
}
return(
           <div id="insideBackground" className="centerSpace flex-start" >
                <ExitButton func={() => navigate('/')}/>
               <BiSwim className="swim-icon"/>
               <h2 className="sign-in-label">Sign in</h2>
               <div className={`${loginError}`} >
                   <p className="alighnTextCenter warning"id="warningTop" >Invalid username or password</p> 
                   <p className="alighnTextCenter"> Please try again</p> 
               </div>
               <form className="centerSpace flex-start" >        
                       <input className="input-spacing" type="text" value={userName} onChange={e => setUserName(e.target.value)} /> 
                       
                       <label>
                       Username
                       </label>

                       <input className="input-spacing" type="password" value={userPassword} onChange={e => setUserPassword(e.target.value)} /> 
                       <label className="label-look">
                       Password
                       </label>     
                   <input onClick={sigInWithEaP} className="submit-button hover" type="button" value="Log in" />
               </form>
               <h3>Log in with Google</h3>
               <FcGoogle onClick={signInWithGoogle} size={30} className="hover google-icon" />
               <p onClick={() => props.nav('create')} className="hover create-account">Create a new account</p>
               <p onClick={() => props.forgot('forgot')} className="hover forgot-password">Forgot password</p>
           </div>
);
}


export default SingIn;