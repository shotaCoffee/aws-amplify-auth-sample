import React from 'react';

type TypeAuthContext = {
  user: any,
  updateCurrentUser: any,
  isLoaded: boolean
}


const AuthContext = React.createContext<TypeAuthContext>({
  user: {},
  updateCurrentUser: () => {},
  isLoaded: false
});

export default AuthContext;
