import React from 'react';

type TypeAuthContext = {
  user: any,
  // updateCurrentUser: (user: any) => Promise<void>,
  updateCurrentUser: any,
  isLoaded: boolean
}


const AuthContext = React.createContext<TypeAuthContext>({
  user: {},
  updateCurrentUser: () => {},
  isLoaded: false
});
export default AuthContext;
