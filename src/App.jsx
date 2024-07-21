import React, { useEffect } from 'react'
import Login from './components/login/Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import { useUserStore } from './lib/userStore'
import Details from './components/details/Details'
import { useChatStore } from './lib/chatStore'

function App() {

  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="container"><div className="content"> <h4>loading</h4></div></div>
  return (
    <>
     {currentUser ? (<Details />) : (<Login/>)}
    </>
  )
}

export default App