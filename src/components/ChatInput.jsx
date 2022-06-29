import React, {  useEffect, useState } from 'react';
// Styles
import styled from 'styled-components';
// MUI components and icons
import { Button } from '@mui/material';
// Firebase
import firebase from 'firebase/compat/app';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatInput = ({ channelName, channelId, chatBottomRef }) => {
  // User data
  const [user] = useAuthState(auth)
  
  // Input state
  const [inputValue, setInputValue] = useState('');
  
  const handleSendMessage = e => {
    e.preventDefault();

    if ( !channelId ) return false;
    if ( inputValue ) {
      db.collection('rooms').doc(channelId).collection('messages').add({
        message: inputValue,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImg: user.photoURL,
      });
  
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  
      setInputValue('');
    }
  }

  return (
    <StyChatContainer>
      <form onSubmit={handleSendMessage}>
        <input 
          placeholder={`Send message into #${channelName}`}
          value={inputValue}
          onChange={ e => setInputValue(e.target.value) }
        />
        <Button type="submit" onClick={ handleSendMessage }> SEND </Button>
      </form>
    </StyChatContainer>
  )
}

export default ChatInput;

// Styles
const StyChatContainer = styled.div`
  border-radius: 20px;
  
  form {
    position: relative;
    display: flex;
    justify-content: center;

    input {
      position: fixed;
      bottom: 30px;
      width: 60%;
      border: 1px solid gray;
      border-radius: 3px;
      padding: 20px;
      outline: none;
    }

    button { // MUI button ends up rendering as a regular <button>
      display: none;
    }
  }
`