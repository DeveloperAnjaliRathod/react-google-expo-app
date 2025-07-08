import { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { jwtDecode } from 'jwt-decode';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri, ResponseType, refreshAsync } from 'expo-auth-session';
import Constants from 'expo-constants';
import { tokenStorage } from '../services/tokenStorage';

export interface UserInfo {
  name: string;
  email: string;
  picture: string;
}

export const useAuth = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [auth, setAuth] = useState<any>(null);

  const appScheme = Constants.expoConfig?.scheme;
  const scheme = Array.isArray(appScheme) ? appScheme[0] : appScheme;
  
  const redirectUri = makeRedirectUri({
    scheme: scheme,
  });

  // **YOUR ORIGINAL LOGIC IS PRESERVED HERE**
  // This uses two different authentication flows based on the platform.
  const [request, response, promptAsync] = Platform.OS === 'web'
    ? Google.useAuthRequest({
        redirectUri,
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        scopes: ['openid', 'profile', 'email'],
        responseType: ResponseType.Code,
        clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
        extraParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      })
    : Google.useAuthRequest({
        redirectUri,
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        scopes: ['openid', 'profile', 'email'],
      });

  // **YOUR ORIGINAL useEffect LOGIC IS PRESERVED HERE**
  useEffect(() => {
    if (response) {
      if (response.type === 'success' && response.authentication) {
        setAuth(response.authentication);
        if (response.authentication.idToken) {
          const decoded: UserInfo = jwtDecode(response.authentication.idToken);
          setUserInfo(decoded);
        }
        if (response.authentication.refreshToken) {
          tokenStorage.saveRefreshToken(response.authentication.refreshToken);
        }
      } else if (response.type === 'error') {
        console.error("Authentication responded with error:", response.error);
        Alert.alert('Authentication Error', response.error?.message || 'An unknown error occurred');
      }
    }
  }, [response]);

  const signOut = async () => {
    setUserInfo(null);
    setAuth(null);
    await tokenStorage.deleteRefreshToken();
  };

  const refreshAccessToken = async () => {
    const storedRefreshToken = await tokenStorage.getRefreshToken();
    if (!storedRefreshToken) {
      Alert.alert('No Refresh Token available.', 'This is expected on mobile with your current configuration.');
      return;
    }

    const platformClientId = Platform.select({
      ios: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
      android: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
      web: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    })!;

    const refreshConfig = Platform.OS==='web'?{
      refreshToken: storedRefreshToken,
      clientId: platformClientId,
      clientSecret: process.env.EXPO_PUBLIC_CLIENT_SECRET,
    }:{
        refreshToken: storedRefreshToken,
        clientId: platformClientId,
        
      };

    try {
      const refreshedTokens = await refreshAsync(refreshConfig, Google.discovery);
      setAuth(refreshedTokens);
      if (refreshedTokens.idToken) {
        setUserInfo(jwtDecode(refreshedTokens.idToken));
      }
      if (refreshedTokens.refreshToken) {
        await tokenStorage.saveRefreshToken(refreshedTokens.refreshToken);
      }
      Alert.alert('Token Refreshed!');
    } catch (error) {
      console.error("Failed to refresh token:", error);
      Alert.alert('Refresh Error', 'Failed to refresh token. Please sign out and sign in again.');
      await signOut();
    }
  };
  
  return {
    request,
    userInfo,
    auth,
    signIn: () => promptAsync(),
    signOut,
    refreshAccessToken,
  };
};