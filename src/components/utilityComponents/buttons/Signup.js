import React from "react";

import {auth} from '../../../firebase'
import {signInWithPopup, GoogleAuthProvider } from 'firebase/auth'




const SignUp = (props) => {


    const googleAuthProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
    await signInWithPopup(auth,googleAuthProvider);
   
    
    }
    
    
    return(<button className='signup-button spacing' onClick={signInWithGoogle}>Sign in with Google</button>

)};

export default SignUp;