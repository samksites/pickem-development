
import '../general.css'
import './css/signInPage.css'
import {useState, useEffect } from 'react';
import React from "react";
import SingIn from "./SignIn";
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';

/**
 * This component holds the sign in page information 
 * @returns SignInPage
 */
const SignInPage = () => {


    // Sets if user is logging in creating account or forgot password
   const [signInAction, setSignInAction] = useState(null);


    // Switches which sign in option is used
    const switchPage = (action) => {
        switch(action){
            case 'signIn':
                setSignInAction(<SingIn nav={() => switchPage('create')} forgot={() => switchPage('forgot')}/>)
                break;
            case 'forgot':
                setSignInAction(<ForgotPassword nav={() => switchPage('signIn')} />);
                break;
            default:
                setSignInAction(<CreateAccount nav={() => switchPage('signIn')}/>)
                break;
                
        }

    }
    
    useEffect(() => {
       setSignInAction( <SingIn nav={switchPage} forgot={() => switchPage('forgot')}/>)
      }, []);

 

    return(
        <div className="flex-center full-width">
            <div className="border-gradient border-gradient-purple position flex-super-center">
                {signInAction}
            </div>

        </div>
    );
}








export default SignInPage;