import React from 'react';
// Styles
import styled from 'styled-components';
// Icons
import TagIcon from '@mui/icons-material/Tag';
// Firebase
import { db } from '../firebase';
// Redux
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';

const SidebarOption = ({ Icon, text, addChannelOption, id }) => {
  const dispatch = useDispatch();

  // Channel handlers
  const addChannel = () => {
    const channelName = prompt('Enter the new channel name');
  
    if(channelName) {
      db.collection('rooms').add({
        name: channelName,
      })
    }
  }

  const selectChannel = () => {
    if (id) dispatch( enterRoom({ roomId: id }) );
  }

  return (
    <StyOptionContainer
      onClick={ addChannelOption ? addChannel : selectChannel}
    >
      { Icon && <Icon sx={{ padding: '7px', fontSize: '18px' }} />}
      {
        Icon 
          ? <h3>{text}</h3>
          // : <StyOptionChannel><TagIcon />{text}</StyOptionChannel>
          : <>
              <TagIcon sx={{ padding: '7px', fontSize: '18px' }} />
              <h3>{text}</h3>
            </>
      }
    </StyOptionContainer>
  )
}

export default SidebarOption;

// Styles

const StyOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  padding: 8px;

  &:hover {
    opacity: 0.9;
    background-color: #340e36;
  }

  h3 {
    font-weight: 500;
  }

  svg {
    margin-right: 10px;
  }
`

const StyOptionChannel = styled.h3`
  // SVG para # --> padding: 15px;
  padding: 10px 0;
  font-weight: 300;
`