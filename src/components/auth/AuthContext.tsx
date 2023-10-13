import React from 'react';

export const AuthContext = React.createContext({
  id: '',
  isLogged: false,
  email: '',
  loading: false,
  authLogin: (_newId: string | undefined) => {},
  authLogout: () => {},
  saveEmail: (_email: string | undefined) => {},
  isLoading: (_loading: boolean | undefined) => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

function AuthContextProvider({children}: AuthContextProviderProps) {
  const [id, setId] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  function authLogin(newId: string | undefined) {
    if (newId) {
      setId(newId);
    }
  }

  function authLogout() {
    setId('');
  }

  function saveEmail(newEmail: string | undefined) {
    if (newEmail) {
      setEmail(newEmail);
    }
  }

  function isLoading(newLoading: boolean | undefined) {
    if (newLoading !== undefined) {
      setLoading(newLoading);
    }
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
