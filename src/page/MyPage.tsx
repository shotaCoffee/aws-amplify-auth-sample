import React from 'react';
import UserContext from '../context/UserContext'
import { Auth } from 'aws-amplify';

const MyPage = () => {
  const {user, updateCurrentUser, isLoaded} = React.useContext(UserContext)

  React.useEffect(() => {
    updateCurrentUser()
  },[])

  const handleSignOut = async () => {
    await Auth.signOut().then(res => {
      console.log(res)
      alert('ログアウトしました')
    })
  }

  return (
    isLoaded ? (
      <>
        {user.username}
        <div>
          <button onClick={handleSignOut}>sign out</button>
        </div>
      </>
    ) : (
      <>
        <p>now loading</p>
      </>
    )
  )
}

export default MyPage
