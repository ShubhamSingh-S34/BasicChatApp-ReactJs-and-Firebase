import React, { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
function Chat(props) {

    const [newMessage, setNewMessage] =useState('');
    const [messages, setMessages]= useState([]);
    const messageCollectionRef=collection(db,'messages')


    useEffect(()=>{
        const queryMessage= query(messageCollectionRef, where("room","==", props.room));
        const unsuscribe=onSnapshot(queryMessage, (snapshot)=>{
            let messages=[];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id:doc.id});
            })
            setMessages(messages);
        })
        return unsuscribe();
    },[])


    const handleSubmit=async (e)=>{
        e.preventDefault();
        
        if(newMessage==='') return;
        try{
            const result=await addDoc(messageCollectionRef, {
                text:newMessage,
                createdAt: serverTimestamp(),
                user: auth.currentUser.displayName,
                room:props.room,
            } );
            setNewMessage("");
            console.log(newMessage); 
        }
        catch(e){
            console.log('ERROR !!!');
            console.error(e);
        }
    }
  return (
    <div className='chat-app'>
        <div>{messages.map((message)=><h1>{message.text}</h1>)}</div>
        <form className='new-message-form' onSubmit={handleSubmit}>
            <input 
            className='new-message-input' 
            placeholder='Type Your Message Here' 
            onChange={(e)=>{setNewMessage(e.target.value)}} 
            value={newMessage}/>
            <button type='submit' className='send-button'>Send</button>
        </form>
    </div>
  )
}

export default Chat