import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { registerRootComponent } from 'expo';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { toastConfig } from '@/config/themedToast';
import Navigation from '@/navigation';
import store, { persistor } from '@/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
        <Toast config={toastConfig} />
      </PaperProvider>
    </Provider>
  );
};

registerRootComponent(App);

export default App;
