import React from 'react';
import { StyleSheet, Image, View, Text, Button, ScrollView } from 'react-native';
import { UserInfo } from '../hooks/useAuth';

interface UserProfileScreenProps {
  userInfo: UserInfo;
  idToken: string | null;
  onSignOut: () => void;
  onRefresh: () => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ userInfo, idToken, onSignOut, onRefresh }) => {
  return (
    // **THE FIX**: The ScrollView allows the content to scroll if it overflows the screen height.
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.userInfoContainer}>
        <Text style={styles.title}>Welcome, {userInfo.name}!</Text>
        {userInfo.picture && (
          <Image source={{ uri: userInfo.picture }} style={styles.profileImage} />
        )}
        <Text style={styles.userInfoText}>Email: {userInfo.email}</Text>
        <Text style={styles.tokenTitle}>ID Token:</Text>
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenText} selectable={true}>{idToken}</Text>
        </View>
        <View style={styles.buttonGroup}>
          <Button title="Refresh Token" onPress={onRefresh} color="#1abc9c" />
          <Button title="Sign Out" onPress={onSignOut} color="#c23616" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // **NEW STYLES** for the ScrollView
  scrollContainer: {
    width: '100%',
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  // Your existing styles remain, with minor adjustments if needed
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2f3542',
    textAlign: 'center',
    marginBottom: 10,
  },
  userInfoContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400, // Added a max-width for better tablet/web layout
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
  },
  userInfoText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#2f3542',
  },
  tokenTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#2f3542',
    alignSelf: 'flex-start',
  },
  tokenContainer: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f1f2f6',
    borderRadius: 5,
    width: '100%',
    borderWidth: 1,
    borderColor: '#dfe4ea',
  },
  tokenText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#57606f',
  },
  buttonGroup: {
    marginTop: 20,
    width: '100%',
    gap: 10,
  },
});