import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from './src/hooks/useAuth';
import { SignInScreen } from './src/components/SignInScreen';
import { UserProfileScreen } from './src/components/UserProfileScreen';

// This line is essential for the web popup to close automatically.
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const { request, userInfo, auth, signIn, signOut, refreshAccessToken } = useAuth();

  return (
    <View style={styles.container}>
      {userInfo ? (
        <UserProfileScreen 
          userInfo={userInfo}
          idToken={auth?.idToken}
          onSignOut={signOut}
          onRefresh={refreshAccessToken}
        />
      ) : (
        <SignInScreen 
          request={request} 
          onSignIn={signIn} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f6fa',
  },
});