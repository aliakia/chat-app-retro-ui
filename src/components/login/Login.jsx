import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import './login.css'

function Login() {

  const [isLogin, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)

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

      alert("account created")

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)

    const formData = new FormData(e.target)
    const { pw, email } = Object.fromEntries(formData)

    try {
      await signInWithEmailAndPassword(auth, email, pw)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>

        {
          isLogin ? (
            <form autoComplete="new-password" onSubmit={handleLogin} className="container login">

            <input type="email" placeholder='email' name='email' autoComplete="new-password" />
            <input type="password" placeholder='password' name='pw'/>
            <button disabled={loading}>{loading ? "loading" : "login"}</button>
            <button onClick={() => setLogin(!isLogin)}>create account?</button>
        </form>
          ) : (
            <form autoComplete="new-password" onSubmit={handleRegister} className="container login" >

            <input type="text" placeholder='username' name='username' autoComplete="off"/>
            <input type="password" placeholder='password' name='pw'/>
            <input type="email" name="email" placeholder='email' autoComplete="off"/>

            <button disabled={loading}>{loading ? "loading" : "register"}</button>
            <button onClick={() => setLogin(!isLogin)}>login to ur account?</button>
        </form>
          )
        }
    </>
  )
}

export default Login

