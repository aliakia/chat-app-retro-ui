import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

function Login() {

  const [isLogin, setLogin] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)

    const {username, pw, email} = Object.fromEntries(formData)
    try {
      
      const res = await createUserWithEmailAndPassword(auth, email, pw)

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        blocked: [],
      });
      
      await setDoc(doc(db, "userschats", res.user.uid), {
        chats: [],
      });

    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = e => {
    e.preventDefault();
  }

  return (
    <>


        {
          isLogin ? (
            <form autoComplete="new-password" onSubmit={handleLogin} className="container login">

            <input type="text" placeholder='username' name='username' autoComplete="new-password" />
            <input type="password" placeholder='password' name='pw'/>
            <button>login</button>
            <button onClick={() => setLogin(!isLogin)}>create account?</button>
        </form>
          ) : (
            <form autoComplete="new-password" onSubmit={handleRegister} className="container login" >

            <input type="text" placeholder='username' name='username' autoComplete="off"/>
            <input type="password" placeholder='password' name='pw'/>
            <input type="email" name="email" placeholder='email' autoComplete="off"/>

            <button>register</button>
            <button onClick={() => setLogin(!isLogin)}>login to ur account?</button>
        </form>
          )
        }
    </>
  )
}

export default Login

