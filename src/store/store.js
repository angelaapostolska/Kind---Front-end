import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { cdtApi } from '@/api/api';
import { authApi } from '@/api/authApi';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: true,
    }).concat(cdtApi.middleware, authApi.middleware),
});

export const persistor = persistStore(store);

// Export hooks for convenience
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export default store;
