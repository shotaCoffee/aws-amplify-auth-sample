import React from 'react';
import './App.css';
import {Auth} from 'aws-amplify';

import UserContext from '../context/UserContext'
import AppRouter from '../Router';

function App() {
  const [currentUser, setCurrentUser] = React.useState<null | {}>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    updateCurrentUser(null)
  }, [])

  const updateCurrentUser = async (user: any) => {
    if (user) {
      setCurrentUser(user)
      return
    }

    try {
      const user = await Auth.currentAuthenticatedUser()
      setCurrentUser(user)
      setIsLoaded(true)
    } catch (e) {
      setCurrentUser(null)
      setIsLoaded(true)
    }
  }

  return (
    <UserContext.Provider value={{
      user: currentUser,
      updateCurrentUser: updateCurrentUser,
      isLoaded: isLoaded
    }}>
      <div className="App">
        <AppRouter />
      </div>
    </UserContext.Provider>
  );
}

// NOTE 追加
export default App;
