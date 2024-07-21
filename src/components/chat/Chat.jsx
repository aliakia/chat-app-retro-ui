import React, { useEffect, useState } from 'react'
import './chat.css'
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { useChatStore } from '../../lib/chatStore';
import { db } from '../../lib/firebase';
import { useUserStore } from '../../lib/userStore';

function Chat() {
    const [chat, setChat] = useState();
    const [text, setText] = useState("");
    const {chatId, user} = useChatStore();
    const {currentUser} = useUserStore();

  useEffect(() => {
    const unSub  = onSnapshot(doc(db, "chats", chatId), (res) => {
        setChat(res.data());
    });

    return () => {
        unSub();
    };
  }, [chatId])  

  const handleSend = async () => {
    if (text === "") return;

    try {
        await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
                senderId: currentUser.id,
                text,
                createdAt: new Date(),
            }),
        });

        const userIDs = [currentUser.id, user.id ]

        userIDs.forEach(async (id) => {

            const userChatsRef = doc(db, "userchats", id)
            const userChatSnapshot = await getDoc(userChatsRef)
            
            if (userChatSnapshot.exists()) {
                const userChatsData = userChatSnapshot.data()
    
                const chatIndex = userChatsData.chats.findIndex(c=> c.chatId === chatId)
                userChatsData.chats[chatIndex].lastMessage = text;
                userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                userChatsData.chats[chatIndex].updatedAt = Date.now();
    
                await updateDoc(userChatsRef, {
                    chats: userChatsData.chats,
                }); 
            }
        });

    } catch (error) {
        console.log(error);
    }
  }
  return (

      <>
        <div className="chat">
            <div className='title'>
                <h4>chat box</h4>
            </div>
            <div className="content">
                <div className="chats">
                    {chat?.messages?.map((message) => (
                    <div className={message.senderId === currentUser?.id ? "you" : ""} key={message.createAt}>
                        <p>{message?.text} </p>
                    </div> 
                    ))}
                </div>
                <div className="text">
                    <input onChange={(e) => setText(e.target.value)} type='text' value={text}></input>
                    <button onClick={handleSend}>send</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Chat