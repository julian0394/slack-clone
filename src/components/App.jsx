import React from 'react';
// Styles
import styled from 'styled-components';
import '../App.css';
// React Router
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// Firebase
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
// Components
import Header from './Header';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import Spinner from 'react-spinkit';

function App() {
  const [user, loading] = useAuthState(auth);

  if(true) {
    return (
      <StyAppLoading>
        <StyAppLoadingContent>
          <Spinner 
            name="three-bounce"
            color="purple"
            fadeIn="none"
          />
        </StyAppLoadingContent>
      </StyAppLoading>
    )
  }

  return (
    <>
      {
        !user
        ? 
          <Login /> 
        : 
          <>
            <Header />
            <StyAppBody>
              <Sidebar />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={ <Chat /> } />
                </Routes>
              </BrowserRouter>
            </StyAppBody>
          </>
      } 
      
    </>
  );
}

export default App;

// Styles
const StyAppBody = styled.div`
  display: flex;
  height: 100vh;
`

const StyAppLoading = styled.div`

`

const StyAppLoadingContent = styled.div`
  padding-top: 25%;
  display: flex;
  justify-content: center;
`
