import React from "react";
import {auth} from '../firebase'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'

const SignUp = () => {
    const googleAuthProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
     const test = await signInWithPopup(auth,googleAuthProvider);
    }
    
    return(<button onClick={signInWithGoogle}>Sign in with Google</button>

)};

export default SignUp;