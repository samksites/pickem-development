import {signOut} from 'firebase/auth'

import {auth} from '../../../firebase'
import React from 'react';


const SignOut = (props) => {

    const sOut = async () => {
        try{
             await signOut(auth);
             
        } catch(e){
        }
          }


    return(<button className='signup-button spacing' onClick={sOut}>Click to sign out</button>)
}

export default SignOut;