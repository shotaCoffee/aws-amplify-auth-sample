import React from 'react';
import {Auth} from 'aws-amplify';
import {useHistory} from 'react-router-dom';
import {SignUpInfoKey, SignUpInfoType} from '../auth';

const SignIn = () => {
  const history = useHistory();

  const [userInfo, setUserInfo] = React.useState<SignUpInfoType>(
    {
      authCode: '',
      email: '',
      password: '',
      showConfirmation: false,
      username: ''
    }
  )

  const handleSignIn = () => {
    Auth.signIn(userInfo.username, userInfo.password)
      .then(user => {
        if (!user.signInUserSession) {
          console.info(user)
          history.push('/')
        } else {
          console.info(user)
          alert('ログインできました')
          history.push('/mypage')
        }
      })
      .catch(e => {
        console.error(e)
      })
  }

  const handleChange = (target: SignUpInfoKey, value: string | boolean) => {
    // @ts-ignore
    userInfo[target] = value;
    const data: SignUpInfoType = Object.assign({}, userInfo);
    setUserInfo(data)
  }

  return (
    <div>
      <h2>sign in</h2>
      <input type="text" placeholder='Username' onChange={event => handleChange('username', event.target.value)}/>
      <input type="password" placeholder='Password' onChange={event => handleChange('password', event.target.value)}/>
      <div>
        <button onClick={handleSignIn}>sign in</button>
      </div>
    </div>
  )
}

export default SignIn
