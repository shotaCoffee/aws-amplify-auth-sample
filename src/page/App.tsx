import React from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import SignUp from './SignUp';
import {Auth} from 'aws-amplify';

import UserContext from '../context/UserContext'
import SignIn from './SignIn';
import Confirm from './Confirm';
import MyPage from './MyPage';

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
        <Router>
          {
            currentUser === null ?
              <>
                <Redirect path={'/'} to={'/signup'}/>
                <Route path={'/signup'} component={SignUp}/>
                <Route path={'/confirm'} component={Confirm}/>
                <Route path={'/signin'} component={SignIn}/>
              </>
            : <>
                <Redirect path={'/'} to={'/mypage'}/>
                <Route path={'/mypage'} component={MyPage}/>
              </>
          }
        </Router>
      </div>
    </UserContext.Provider>
  );
}

// NOTE 追加
export default App;
