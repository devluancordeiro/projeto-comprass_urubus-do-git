import 'react-native-gesture-handler';
import React from 'react';
import StoreFlow from './routes/StoreFlow';
import {Provider} from 'react-redux';
import {store} from './redux/store'; // Import your Redux store

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <StoreFlow />
    </Provider>
  );
}

export default App;
