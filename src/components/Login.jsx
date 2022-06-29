import React from 'react';
// Styles
import styled from 'styled-components';
// components
import { Button } from '@mui/material';
import { auth, provider } from '../firebase';

const Login = () => {
  const handleSignIn = e => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch( err => alert(err.message));
  }
  return (
    <StyLoginContainer>
      <StyInnerLoginContainer>
        {/* <img src="#" alt="Logo" /> */}
        <h1>Session login</h1>
        <Button variant="contained" onClick={handleSignIn}> Sign in with Google </Button>
      </StyInnerLoginContainer>
    </StyLoginContainer>
  )
}

export default Login;

// Styles

const StyLoginContainer = styled.div`

`

const StyInnerLoginContainer = styled.div`
  // TODO: ajustes de caja y sombra
  img {
    // TODO: ajustes de imagen
  }

  button {
    text-transform: inherit;
  }
`