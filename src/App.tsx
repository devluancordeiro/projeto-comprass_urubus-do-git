import 'react-native-gesture-handler';
import React from 'react';
import {StoreContextProvider} from './contexts/StoreContext';
import StoreFlow from './routes/StoreFlow';

function App(): JSX.Element {
  return (
    <StoreContextProvider>
      <StoreFlow />
    </StoreContextProvider>
  );
}

export default App;
