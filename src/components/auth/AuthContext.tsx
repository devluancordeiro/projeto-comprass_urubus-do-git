import React from 'react';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';

export const AuthContext = React.createContext({
  id: '',
  isLogged: false,
  email: '',
  loading: false,
  oppening: true,
  error: true,
  searching: false,
  authLogin: (_newId: string | undefined) => {},
  authLogout: () => {},
  saveEmail: (_email: string | undefined) => {},
  isLoading: (_loading: boolean | undefined) => {},
  isSearching: (_searching: boolean | undefined) => {},
  generateError: (_error: boolean | undefined) => {},
  isOppening: (_oppening: boolean | undefined) => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const storage = new MMKVLoader().initialize();

function AuthContextProvider({children}: AuthContextProviderProps) {
  const [id, setId] = useMMKVStorage('id', storage, '');
  const [oppening, setOppening] = React.useState<boolean>(true);
  const [email, setEmail] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searching, setSearching] = React.useState<boolean>(false);

  function authLogin(newId: string | undefined) {
    if (newId) {
      setId(newId);
    }
  }

  function isOppening(newOppening: boolean | undefined) {
    if (newOppening !== undefined) {
      setOppening(newOppening);
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
    oppening: oppening,
    authLogin: authLogin,
    authLogout: authLogout,
    saveEmail: saveEmail,
    isLoading: isLoading,
    generateError: generateError,
    isSearching: isSearching,
    isOppening: isOppening,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
