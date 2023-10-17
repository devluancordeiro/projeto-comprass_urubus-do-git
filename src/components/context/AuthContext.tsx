import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const STORAGE_KEY = '123';

function AuthContextProvider({children}: AuthContextProviderProps) {
  const [id, setId] = React.useState<string>('');
  const [oppening, setOppening] = React.useState<boolean>(true);
  const [email, setEmail] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [searching, setSearching] = React.useState<boolean>(false);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setId(value);
      }
    } catch {}
  };

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value);
    } catch {}
  };

  function authLogin(newId: string | undefined) {
    if (newId) {
      setId(newId);
      storeData(newId);
    }
  }

  function isOppening(newOppening: boolean | undefined) {
    if (newOppening !== undefined) {
      setOppening(newOppening);
    }
  }

  function authLogout() {
    setId('');
    AsyncStorage.removeItem(STORAGE_KEY);
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
