import {initializeApp} from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';

const app = initializeApp( {

    apiKey: "AIzaSyATUbz6LmrJszKZMuZz3GircuhD7gjrj3A",

  authDomain: "pickem-development-7bd47.firebaseapp.com",

  projectId: "pickem-development-7bd47",

  storageBucket: "pickem-development-7bd47.appspot.com",

  messagingSenderId: "833285461334",

  appId: "1:833285461334:web:961ae944ebb99ed86db2f7"
  
  });

  export const auth = getAuth(app);
  export default app;
  