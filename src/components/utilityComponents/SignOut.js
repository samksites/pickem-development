import {signOut} from 'firebase/auth'
import SignUp from './Signup';
import {auth} from '../../firebase'
import React from 'react';


const SignOut = (props) => {

    const sOut = async () => {
        try{
             await signOut(auth);
             props.s(<SignUp s={props.s}/>);
        } catch(e){
        }
          }


    return(<button onClick={sOut}>Clikc to sign out</button>)
}

export default SignOut;