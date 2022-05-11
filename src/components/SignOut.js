import {signOut} from 'firebase/auth'
import {auth} from '../firebase'


const SignOut = () => {

    const sOut = async () => {
        try{
            const test = await signOut(auth);
            console.log("yo");
        } catch(e){
            console.log(e);
        }
          }


    return(<button onClick={sOut}>Clikc to sign out</button>)
}

export default SignOut;