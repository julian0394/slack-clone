import React from 'react';
// Styles
import styled from 'styled-components';
// Icons
import { Avatar } from '@mui/material';
import { 
  AccessTime, 
  HelpOutline, 
  Search as SearchIcon 
} from '@mui/icons-material';
// Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Header = () => {
  const [user] = useAuthState(auth)
  const handleSignOut = () => auth.signOut();

  return (
    <StyHeaderContainer>
      
      <StyHeaderLeft>
        <StyHeaderAvatar src={user?.photoURL} alt={`${user?.displayName} profile image`} onClick={handleSignOut} />
        <AccessTime />
      </StyHeaderLeft>

      <StyHeaderSearch>
        <SearchIcon />
        <input type="text" placeholder='Busca un canal' name="" id="" />
      </StyHeaderSearch>

      <StyHeaderRight>
        <HelpOutline />
      </StyHeaderRight>

    </StyHeaderContainer>
  )
}

export default Header;

// Styles

const StyHeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0; // original: 18px 0
  background-color: var(--slack-color);
  color: #fff;
`

const StyHeaderLeft = styled.div`
  flex: 0.3; // Tercio de la pantalla
  display: flex;
  align-items: center;
  margin-left: 20px;

  > svg { // O por selector de MUI Icons: .MuiSvgIcon-root
    margin-left: auto;
    margin-right: 30px;
  }
`

const StyHeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  /* background-color: #421f44; */
  background-color: #452847;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: #868585;
  border: 1px solid #8f6d92;

  input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: none;
    color: #fff
  }
`

const StyHeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  svg { // O por selector de MUI Icons: .MuiSvgIcon-root
    margin-left: auto;
    margin-right: 20px;
  }  
`

const StyHeaderAvatar = styled(Avatar)`
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`