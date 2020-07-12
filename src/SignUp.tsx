import React from 'react';
import {Auth} from 'aws-amplify';

// NOTE phone_numberなども必要あれば追加
type SignUpInfoType = {
  username: string
  password: string
  email: string
  authCode: string
  showConfirmation: boolean
}

type SignUpInfoKey = keyof SignUpInfoType

const SignUp = () => {
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
      })
      .catch(e => {
        console.error(e)
      })
  }

  const handleConfirmSignUp = () => {
    Auth.confirmSignUp(userInfo.username, userInfo.authCode)
      .then(() => alert('認証できました'))
      .catch(e => console.error(e))
  }

  const handleSignIn = () => {
    Auth.signIn(userInfo.username, userInfo.password)
      .then(user => {
        if (!user.signInUserSession) {
          console.info(user)
        } else {
          console.info(user)
          alert('ログインできました')
        }
      })
      .catch(e => {
        console.error(e)
      })
  }

  return (
    <>
      {/*{!userInfo.showConfirmation && (*/}
        <div>
          <h2>Sign Up</h2>
          <input type="text" placeholder='Username' onChange={event => handleChange('username', event.target.value)}/>
          <input type="password" placeholder='Password' onChange={event => handleChange('password', event.target.value)}/>
          <input type="email" placeholder='Email' onChange={event => handleChange('email', event.target.value)}/>
          <div>
            <button onClick={handleSignUp}>sign up</button>
          </div>
        </div>
      {/* )}*/}
      <hr/>
      {/*{userInfo.showConfirmation && (*/}
        <div>
          <h2>Confirm</h2>
          <input type="text" placeholder='Username' onChange={event => handleChange('username', event.target.value)}/>
          <input type="text" placeholder='Confirmation Code' onChange={event => handleChange('authCode', event.target.value)}/>
          <div>
            <button onClick={handleConfirmSignUp}>confirm</button>
          </div>
        </div>
      {/*)}*/}
      <hr/>
      <div>
        <h2>sign in</h2>
        <input type="text" placeholder='Username' onChange={event => handleChange('username', event.target.value)}/>
        <input type="password" placeholder='Password' onChange={event => handleChange('password', event.target.value)}/>
        <div>
          <button onClick={handleSignIn}>sign in</button>
        </div>
      </div>
    </>
  )
}

export default SignUp
