import React from "react";
import './css/navBarCss.css'
import {auth} from '../../firebase'
import SignOut from "./SignOut";
import {signInWithPopup, GoogleAuthProvider } from 'firebase/auth'




const SignUp = (props) => {


    const googleAuthProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
    await signInWithPopup(auth,googleAuthProvider);
   
    props.s(<SignOut s={props.s}/>);
    }
    
    
    return(<button id="sighnUpButton" onClick={signInWithGoogle}>Sign in with Google</button>

)};

export default SignUp;