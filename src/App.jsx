import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { toastConfig } from '@/config/themedToast';
import { loadFonts } from '@/constants/theme/fonts';
import Navigation from '@/navigation';
import store, { persistor } from '@/store/store';

const App = () => {
  const [fontsLoaded] = useFonts(loadFonts());

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
