import React from 'react';
import {Auth} from 'aws-amplify';
import {SignUpInfoKey, SignUpInfoType} from '../service/auth.service';
import { useHistory } from 'react-router-dom';

const Confirm = () => {
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

  const handleConfirmSignUp = () => {
    Auth.confirmSignUp(userInfo.username, userInfo.authCode)
      .then(() => {
        alert('認証できました、ログイン画面からログインしてください')
        history.push('/signin')
      })
      .catch(e => console.error(e))
  }

  return (
    <div>
      <h2>Confirm</h2>
      <input type="text" placeholder='Username' onChange={event => handleChange('username', event.target.value)}/>
      <input type="text" placeholder='Confirmation Code' onChange={event => handleChange('authCode', event.target.value)}/>
      <div>
        <button onClick={handleConfirmSignUp}>confirm</button>
      </div>
    </div>
  )
}

export default Confirm
