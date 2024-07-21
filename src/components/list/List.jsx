import React, { useEffect, useState } from 'react'
import './list.css'
import { useUserStore } from '../../lib/userStore'
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import Chat from '../chat/Chat'

function List(props) {
  const [openChat, setOpenChat] = useState(true)
  const [chats, setChats] = useState([])
  const {currentUser} = useUserStore()
  const { chatId,  changeChat} = useChatStore()
  
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data().chats;

      const promises = items.map( async(item) => {
        const userDocRef = doc(db,"users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef)

        const user = userDocSnap.data()
        return {...item, user}
      });

      const chatData = await Promise.all(promises);
      setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt))
    }
  );

    return () => {
      unsub()
    }
  }, [currentUser.id])

  const handleSelect  = async (chat) => {
    const  userChats = chats.map(item=> {
      const { user, ...rest } = item;
      return rest;
    })

    const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId);

    userChats[chatIndex].isSeen = true;
    const userChatsRef = doc(db, "userchats", currentUser.id)

    try {
      
      await updateDoc(userChatsRef, {
        chats: userChats, 
      });
      changeChat(chat.chatId, chat.user)
    } catch (error) {
      console.log(error);
    }

  }

  return (props.trigger) ? ( 
    <>
      <div className="list">
          <div className='title'>
              <h4>recent messages</h4>
              <button onClick={() => props.setTrigger(false)} type="button">X</button>
          </div>

            <div className="content">
              {chats.map((chat) => (
                <div onClick={() => handleSelect(chat)} className="texts" key={chat.chatId}>
                <h3 onClick={() => setOpenChat(true)} className='name'>{chat.user.username}</h3>
                <p className='message'>{chat.lastMessage}</p>
            </div>
              ))}
          </div>
      </div>
      {chatId && <Chat />}
    </>
  ) : ""
}

export default List