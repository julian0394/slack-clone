import React, { useEffect, useRef } from 'react';
// Styles
import styled from 'styled-components';
// Icons
import {
  Tag as TagIcon, 
  StarBorder as StarIcon,
  InfoOutlined as InfoIcon
} from '@mui/icons-material';
// Redux
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
// Firebase
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
// Components
import ChatInput from './ChatInput';
import Message from './Message';

const Chat = () => {
  const chatBottomRef = useRef(null);

  /*** Instancia de datos desde firebase ***/
  const roomId = useSelector(selectRoomId);
    
  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId && 
    db
    .collection('rooms')
    .doc(roomId)
    .collection('messages')
    .orderBy('timestamp', 'asc')
  );

  const channelName = roomDetails?.data().name;
  /*** Fin de instancia de datos desde firebase ***/
  
  useEffect( () => {
    chatBottomRef.current?.scrollIntoView(); // Se le puede agregar el argumento {behavior: 'smooth'}
  }, [ roomId, loading ]);

  return (
    <StyChatContainer>
      {
        roomDetails && roomMessages && //TODO: AGREGAR UN COMPONENTE 'OPEN A CHANNEL' PARA CUANDO NO HAYA NINGUNO SELECCIONADO
        (
          <>
            <StyChatHeader>
              <StyHeaderLeft>
                <h4>#{channelName}</h4> <StarIcon />
              </StyHeaderLeft>
              <StyHeaderRight>
                <InfoIcon /> <p>Details</p>
              </StyHeaderRight>
            </StyChatHeader>

            <StyChatMessages>
              {
                roomMessages?.docs.map( doc => {
                  const { message, timestamp, user, userImg } = doc.data();
                  return (
                    <Message 
                      key={doc.id}
                      message={message}
                      timestamp={timestamp}
                      user={user}
                      userImg={userImg}
                    />
                  )
                })
              }
              <StyChatBottomAnchor ref={chatBottomRef} />
            </StyChatMessages>

            <ChatInput 
              channelId={roomId} 
              channelName={channelName} 
              chatBottomRef={chatBottomRef}
            />
          </>
        )
      }
    </StyChatContainer>
  )
}

export default Chat;

// Styles
const StyChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 70px;
  /* padding-bottom: 50px; */
  border-bottom: 100px solid white; // Cubre el input de abajo

  svg {
    font-size: 20px;
  }
`

const StyChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  `
 
 const StyHeaderLeft = styled.div`
  display: flex;
  
  h4 {
    font-size: 18px;
    text-transform: lowercase;
    font-weight: bold;
  }

  svg {
    align-self: center;
    margin-left: 8px;
  }
`
 
const StyHeaderRight = styled.div`
  display: flex;
  align-items: center;
  
  p {
    font-size: 16px;
    margin-left: 8px;
    font-weight: 500;
  }
`

const StyChatMessages = styled.div`

`

const StyChatBottomAnchor = styled.div`
  position: relative;
  right: 0;
  height: 1px;
  /* padding-bottom: 100px; */ //Reemplazado por el input de abajo
`
