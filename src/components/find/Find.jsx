import React, { useState } from 'react'
import './find.css'
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore';

function Find(props) {
    const [user, setUser] = useState(null);
    const {currentUser} = useUserStore()

    const handleFind = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get("username")

        try {
            const userRef = collection(db, "users")

            const q = query(userRef, where("username", "==", username));
            const querySnapShot = await getDocs(q)


            if(!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data())

            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChat = async () => {

        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats")

        try {  
            const newChatRef = doc(chatRef)

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            console.log(newChatRef.id);

            await setDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion ({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                }),
            });
            await setDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion ({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                }),
            });
            
        } catch (error) {
            console.log(error)
        }
    }

  return (props.trigger) ? (
        <div className="find">

            <div className='title'>
                <h4>find</h4>
                <button onClick={() => props.setTrigger(false)} type="button">X</button>
            </div>
            <div className="content">

            <form onSubmit={handleFind} className="search">
                <input name="username" id=""></input>
                <button>find</button>
            </form>

            {user && <div className="result">
                <a onClick={handleChat}>{user.username}</a>
            </div>}
            </div>
        </div>
  ) : ""
}

export default Find