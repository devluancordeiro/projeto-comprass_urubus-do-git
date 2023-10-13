import React from 'react';

export const AuthContext = React.createContext({
  id: '',
  isLogged: false,
  email: '',
  loading: false,
  authLogin: (_newId: number | undefined) => {},
  authLogout: () => {},
  saveEmail: (_email: string | undefined) => {},
  isLoading: (_loading: boolean | undefined) => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

function AuthContextProvider({children}: AuthContextProviderProps) {
  const [id, setId] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false); // Correct the type to boolean

  function authLogin(newId: number | undefined) {
    setId(newId);
  }

  function authLogout() {
    setId('');
  }

  function saveEmail(newEmail: string | undefined) {
    setEmail(newEmail);
  }

  function isLoading(newLoading: boolean | undefined) {
    setLoading(newLoading);
  }

  const value = {
    id: id,
    isLogged: !!id,
    email: email,
    loading: loading,
    authLogin: authLogin,
    authLogout: authLogout,
    saveEmail: saveEmail,
    isLoading: isLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
