import React from 'react';
import {Auth} from 'aws-amplify';
import {useHistory} from 'react-router-dom';
import {SignUpInfoKey, SignUpInfoType} from '../auth';

const SignUp = () => {
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

  const handleChange = (target: SignUpInfoKey, value: string | boolean) => {
    // @ts-ignore
    userInfo[target] = value;
    const data: SignUpInfoType = Object.assign({}, userInfo);
    setUserInfo(data)
  }

  const handleSignUp = () => {
    const {username, password, email} = userInfo

    Auth.signUp({
      username,
      password,
      attributes: {
        email
      }
    })
      .then(() => {
        const data: SignUpInfoType = Object.assign(userInfo, {showConfirmation: true})
        setUserInfo(data)
        alert('メールを確認してください')
        history.push('/confirm')
      })
      .catch(e => {
        console.error(e)
      })
  }


  return (
    <div>
      <h2>Sign Up</h2>
      <input type="text" placeholder='Username' onChange={event => handleChange('username', event.target.value)}/>
      <input type="password" placeholder='Password' onChange={event => handleChange('password', event.target.value)}/>
      <input type="email" placeholder='Email' onChange={event => handleChange('email', event.target.value)}/>
      <div>
        <button onClick={handleSignUp}>sign up</button>
      </div>
    </div>
  )
}

export default SignUp
