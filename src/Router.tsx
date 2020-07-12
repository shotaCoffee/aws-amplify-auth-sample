import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import SignUp from './page/SignUp';
import Confirm from './page/Confirm';
import SignIn from './page/SignIn';
import MyPage from './page/MyPage';
import UserContext from './context/UserContext';

const AppRouter = () => {
  const {user} = React.useContext(UserContext)

  return (
    <Router>
      {
        user === null ?
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
  )
}

export default AppRouter
