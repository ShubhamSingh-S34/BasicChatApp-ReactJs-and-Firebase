import React from 'react'
import {auth, provider} from '../firebase-config.js';
import {signInWithPopup} from 'firebase/auth';
import Cookies from 'universal-cookie';

const cookies=new Cookies();

function Auth(props) {
    
    const signInWithGoogle=async ()=>{
        try{
            const result =await signInWithPopup(auth,provider);
            console.log(result); 
            cookies.set("auth-token", result.user.refreshToken);
            props.setIsAuth(result.user.refreshToken);
        }
        catch(err){
            console.error(err);
        }
        
    }



  return (
  <div>
        <div>Sign in with Google to continue ...</div>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
  </div>
   
  )
}

export default Auth