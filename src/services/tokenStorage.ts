import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const REFRESH_TOKEN_KEY = 'refreshToken';

export const tokenStorage = {
  saveRefreshToken: async (token: string): Promise<void> => {
    if (Platform.OS === 'web') {
      window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } else {
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
    }
  },

  getRefreshToken: async (): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return window.localStorage.getItem(REFRESH_TOKEN_KEY);
    } else {
      return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    }
  },

  deleteRefreshToken: async (): Promise<void> => {
    if (Platform.OS === 'web') {
      window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    } else {
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    }
  },
};