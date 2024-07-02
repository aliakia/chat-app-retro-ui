import React from 'react'
import List from './List'
import ChatBox from './ChatBox'

function Window() {
  return (
    <>
     <div className="container">
            <h4 className='title'>chat box</h4>
            <div className="content">
            <div className="menu">
                <li><a href="">menu</a></li>
                <li><a href="">create new message</a></li>
                <li><a href="">profile</a></li>
                <li><a href="">find</a></li>
                <li><a href="">cat</a></li>
            </div>
               <ChatBox />
            </div>
        </div>
    </>
  )
}

export default Window