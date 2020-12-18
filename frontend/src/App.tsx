import React from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WelcomePage from './components/pages/WelcomePage';
import HomePage from './components/pages/HomePage';
import SocketContextProvider from './contexts/SocketContext';
// import socket from './connection/socket';

function App() {
  return (
    <Container>
      <Router>
        <SocketContextProvider>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route path="/game/:gameId">
              <WelcomePage />
            </Route>
          </Switch>
        </SocketContextProvider>
      </Router>
    </Container>
  );
}

export default App;
