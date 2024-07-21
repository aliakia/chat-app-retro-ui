import React, { useState } from 'react'
import List from '../list/List'
import Find from '../find/Find'
import { useUserStore } from '../../lib/userStore'
import { auth } from '../../lib/firebase'
import './details.css'
 
function Details() {
  const {currentUser, isLoading, fetchUserInfo} = useUserStore();
  const [openList, setOpenList] = useState(false)
  const [openFind, setOpenFind] = useState(false)

  return (
    <>
     <div className="container">
            <h4 className='title'>menu</h4>
            <div className="content">
            <div className="menu">
                <li onClick={() => setOpenFind(true)}>find</li>
                <li onClick={() => setOpenList(true)}>recent messages</li>
                <li onClick={() => auth.signOut()}> logout</li>
            </div>
               <h3 className="welcome">
                welcome, {currentUser.username}!
               </h3>
               <h3>chat with somone now.</h3>
            </div>
        </div>
        <List trigger={openList} setTrigger={setOpenList}/>
        <Find trigger={openFind} setTrigger={setOpenFind}/>

    </>
  )
}

export default Details