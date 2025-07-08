import React from 'react';
import { StyleSheet, Pressable, View, Text, Image } from 'react-native';
import { AuthRequest } from 'expo-auth-session';

const GoogleLogo = () => (
    <Image 
      source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuNmgzLjFjMS44LTEuNyAyLjctNC4zIDIuNy03LjJ6IiBmaWxsPSIjNDI4NUY0IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAxOGM0LjQgMCA4LjEtMi4yIDguMS01LjJsLTMuMS0yLjZDNCAxMi41IDYgMTQgOSAxNHoiIGZpbGw9IiMzNEE4NTMiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik0zLjggMTMuNkMyLjggMTEuNSAyLjggNy45IDMuOCA1LjRMMCAyLjdDLS43IDUuMiAtLjcgMTIuOCAwIDE1LjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMi4zIDAgNC41IDEgNiAyLjZMMTggMUMxNSA SDEyIDAgOSAweiIgZmlsbPSIjRUE0MzM1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNMCAwaDE4djE4SDB6Ii8+PC9nPjwvc3ZnPg==' }} 
      style={{ width: 18, height: 18, marginRight: 24 }} 
    />
);

interface SignInScreenProps {
  request: AuthRequest | null;
  onSignIn: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ request, onSignIn }) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>
      <Pressable
        style={styles.signInButton}
        onPress={onSignIn}
        disabled={!request}
      >
        <GoogleLogo />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
    header: { alignItems: 'center', gap: 8, marginBottom: 40 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#2f3542' },
    subtitle: { fontSize: 16, color: '#57606f' },
    signInButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#4285F4', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 4, elevation: 2 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});