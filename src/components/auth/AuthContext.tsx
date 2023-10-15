import React from 'react';

export const AuthContext = React.createContext({
  id: '',
  isLogged: false,
  email: '',
  loading: false,
  error: true,
  searching: false,
  authLogin: (_newId: string | undefined) => {},
  authLogout: () => {},
  saveEmail: (_email: string | undefined) => {},
  isLoading: (_loading: boolean | undefined) => {},
  isSearching: (_searching: boolean | undefined) => {},
  generateError: (_error: boolean | undefined) => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

function AuthContextProvider({children}: AuthContextProviderProps) {
  const [id, setId] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searching, setSearching] = React.useState<boolean>(false);

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

  function isSearching(newSearching: boolean | undefined) {
    if (newSearching !== undefined) {
      setSearching(newSearching);
    }
  }

  function generateError(newError: boolean | undefined) {
    if (newError !== undefined) {
      setError(newError);
    }
  }

  const value = {
    id: id,
    isLogged: !!id,
    email: email,
    loading: loading,
    error: error,
    searching: searching,
    authLogin: authLogin,
    authLogout: authLogout,
    saveEmail: saveEmail,
    isLoading: isLoading,
    generateError: generateError,
    isSearching: isSearching,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
