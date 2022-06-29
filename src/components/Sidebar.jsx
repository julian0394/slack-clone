import React from 'react';
// Styles
import styled from 'styled-components';
// Icons
import { 
  Create as CreateIcon,
  Circle as CircleIcon,
  Add as AddIcon, 
  KeyboardArrowDown as ArrowDownIcon
} from '@mui/icons-material';
// Utils
import sidebarOptionList from '../utils/sidebarOptionList';
// Firebase
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
// Components
import SidebarOption from './SidebarOption';

const Sidebar = () => {
  // Firebase hooks
  const [channels] = useCollection( db.collection('rooms') );
  const [user] = useAuthState(auth);

  return (
    <StySidebarContainer>
      <StySidebarHeader>
        <StySidebarInfo>
          <h2>PURPLE CHAT</h2>
          <h3><CircleIcon /> Juli Perez</h3>
        </StySidebarInfo>
        <CreateIcon />
      </StySidebarHeader>

      { /* Multiple options list */
        sidebarOptionList.map( (option, i) => {
          return <SidebarOption key={i} Icon={option.icon} text={option.text} />
        })
      }

      <hr />
      <SidebarOption Icon={ArrowDownIcon} text={'Channels'} />
      <hr />
      <SidebarOption Icon={AddIcon} text={'Add channel'} addChannelOption />
      
      {
        channels?.docs.map( doc => (
          <SidebarOption 
            key={doc.id}
            id={doc.id}
            text={doc.data().name}
          />
        ))
      }

    </StySidebarContainer>
  )
}

export default Sidebar;

// Styles

const StySidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`

const StySidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > svg {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: #fff;
    border-radius: 50%;
  }
`

const StySidebarInfo = styled.div`
  flex: 1;
  
  h2 {
    font-size: 15px;
    font-weight: 900;
    margin: 5px 0;
  }

  h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;

    svg {
      font-size: 14px;
      margin-right: 3px;
      color: #10ad10;
    }
  }
`