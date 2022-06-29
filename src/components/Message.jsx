import React from 'react';
// Styles
import styled from 'styled-components';
// Utils
import convertDate from '../utils/convertDate';

const Message = ({ message, timestamp, user, userImg }) => {
  return (
    <StyMessageContainer>
      <img src={userImg} alt="User profile img" />
      <StyMessageInfo>
        <h4>
          {user}{'  '}<span>{ convertDate(timestamp) }</span>
        </h4>
        <p>{message}</p>
      </StyMessageInfo>
    </StyMessageContainer>
  )
}

export default Message;

// Styles
const StyMessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  img {
    height: 50px;
    border-radius: 8px;
          border: 1px solid lightgray;
  }
`

const StyMessageInfo = styled.div`
  padding-left: 10px;

  span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`