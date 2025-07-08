# React Google Expo App

A React Native Expo application that demonstrates Google OAuth authentication using expo-auth-session with platform-specific flows. This app supports iOS, Android, and web platforms, allowing users to sign in with their Google accounts and view their profile information along with the ID token. The app uses **Authorization Code flow** on web (with refresh token support) and standard OAuth flow on mobile platforms.

## Features

- 🚀 **Cross-platform Google OAuth authentication** (iOS, Android, Web)
- 👤 **User profile display** with name, email, and profile picture
- 🔑 **ID token display and decoding** (JWT format)
- 🔄 **Refresh token functionality** with "Refresh Token" button
- 🎨 **Modern UI** with Google-style sign-in button
- 📱 **Responsive design** with ScrollView for all screen sizes
- 🔒 **Platform-specific authentication flows**:
  - **Web**: Authorization Code flow with refresh token support
  - **Mobile**: Standard OAuth flow
- 💾 **Secure token storage** (SecureStore on mobile, localStorage on web)
- 🏗️ **Modular architecture** with custom hooks and components

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [pnpm](https://pnpm.io/) (package manager)
- [Expo](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development - macOS only)

## Google Cloud Console Setup

1. **Create a Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Google Sign-In API:**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sign-In API" and enable it

3. **Create OAuth 2.0 Credentials:**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Create credentials for each platform:

   **For Web:**
   - Application type: Web application
   - Name: React Google Expo App (Web)
   - Copy the Client ID

   **For iOS:**
   - Application type: iOS
   - Name: React Google Expo App (iOS)
   - Bundle ID: `com.anonymous.googleauthdemo`
   - Copy the Client ID

   **For Android:**
   - Application type: Android
   - Name: React Google Expo App (Android)
   - Package name: `com.anonymous.googleauthdemo`
   - SHA-1 certificate fingerprint: (Get this from your keystore)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd react-google-expo-app
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Configuration:**
   Create a `.env` file in the project root:
   ```env
   EXPO_PUBLIC_WEB_CLIENT_ID=your_web_client_id_here
   EXPO_PUBLIC_IOS_CLIENT_ID=your_ios_client_id_here
   EXPO_PUBLIC_ANDROID_CLIENT_ID=your_android_client_id_here
   EXPO_PUBLIC_CLIENT_SECRET=your_web_client_secret_here  # Required for web refresh tokens
   ```

   **Important:** 
   - Replace the placeholder values with your actual Google OAuth client IDs from Google Cloud Console
   - The `CLIENT_SECRET` is required for web platform to enable Authorization Code flow and refresh tokens
   - Get the client secret from the same OAuth credentials in Google Cloud Console

## Running the App

### Development Mode

1. **Start the Expo development server:**
   ```bash
   pnpm start
   ```

2. **Run on specific platforms:**
   ```bash
   # Web
   pnpm run web

   # iOS (macOS only)
   pnpm run ios

   # Android
   pnpm run android
   ```

### Building for Production

1. **Build for all platforms:**
   ```bash
   expo build
   ```

2. **Build for specific platform:**
   ```bash
   # iOS
   expo build:ios

   # Android
   expo build:android
   ```

## Project Structure

```
react-google-expo-app/
├── docs/
│   └── authentication-flow.md    # Detailed flow diagrams and explanations
├── src/
│   ├── components/
│   │   ├── SignInScreen.tsx        # Sign-in UI component
│   │   └── UserProfileScreen.tsx   # User profile with refresh button
│   ├── hooks/
│   │   └── useAuth.ts             # Custom authentication hook
│   └── services/
│       └── tokenStorage.ts       # Secure token storage service
├── android/                       # Android-specific files
├── assets/                        # App assets (icons, splash screens)
├── App.tsx                        # Main application component
├── app.json                       # Expo configuration
├── package.json                   # Dependencies and scripts
├── .env                          # Environment variables (not committed)
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Key Components

### App.tsx
The main application component that:
- Uses the custom `useAuth` hook for authentication
- Renders either `SignInScreen` or `UserProfileScreen` based on auth state
- Provides a clean, centralized app structure

### src/hooks/useAuth.ts
Custom authentication hook that handles:
- **Platform-specific OAuth flows** (Authorization Code for web, standard for mobile)
- **Token management** (ID tokens, access tokens, refresh tokens)
- **Secure token storage** using `tokenStorage` service
- **Token refresh functionality** with `refreshAsync`
- **User state management** (userInfo, auth state)

### src/components/SignInScreen.tsx
Sign-in UI component featuring:
- Google-styled sign-in button with logo
- Clean, modern welcome screen design
- Disabled state handling until auth request is ready

### src/components/UserProfileScreen.tsx
User profile component that displays:
- User's profile picture, name, and email
- **Raw ID token** for debugging purposes
- **"Refresh Token" button** for token refresh
- **"Sign Out" button** for authentication clearing
- **ScrollView** for responsive design on all screen sizes

### src/services/tokenStorage.ts
Secure token storage service that:
- Uses **SecureStore** on mobile for encrypted storage
- Uses **localStorage** on web for persistence
- Provides unified API for saving/retrieving/deleting refresh tokens

### Environment Variables
The app uses the following environment variables:
- `EXPO_PUBLIC_WEB_CLIENT_ID`: Google OAuth client ID for web
- `EXPO_PUBLIC_IOS_CLIENT_ID`: Google OAuth client ID for iOS
- `EXPO_PUBLIC_ANDROID_CLIENT_ID`: Google OAuth client ID for Android

### App Configuration (app.json)
Contains Expo configuration including:
- App metadata (name, version, icon)
- Platform-specific settings
- Deep linking scheme: `com.anonymous.googleauthdemo`

## Authentication Flow

This app uses **platform-specific OAuth flows** with the custom `useAuth` hook:

### Web Platform (Authorization Code Flow)
1. User taps "Sign in with Google"
2. App opens Google OAuth flow with `ResponseType.Code`
3. User authenticates with Google
4. Google returns an **authorization code**
5. App exchanges code for tokens (including **refresh token**)
6. Tokens are stored securely (localStorage)
7. ID token is decoded to extract user information

### Mobile Platform (iOS/Android)
1. User taps "Sign in with Google"
2. App opens Google OAuth flow 
3. User authenticates with Google
4. Google returns tokens directly
5. Tokens are stored securely (SecureStore)
6. ID token is decoded to extract user information

### Token Refresh Flow
1. User taps "Refresh Token" button
2. App retrieves stored refresh token
3. App calls `refreshAsync` with the refresh token
4. New ID token is received and decoded
5. User info is updated with fresh data

## 📊 Visual Flow Diagrams

For a complete visual understanding of the authentication flow, see the detailed diagrams in:
**[docs/authentication-flow.md](docs/authentication-flow.md)**

The documentation includes:
- **Overall authentication flow** diagram
- **Platform-specific sequence** diagrams (Web vs Mobile)
- **Token refresh flow** visualization
- **Component architecture** overview
- **Security considerations** flowchart
- **Error handling** patterns

### Quick Visual Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   App Starts    │    │  Platform Check  │    │  Authentication │
│                 │───▶│                  │───▶│                 │
│  useAuth Hook   │    │  Web / Mobile    │    │  Google OAuth   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                         │
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Sign Out       │    │  User Profile    │    │  Store Tokens   │
│                 │◀───│                  │◀───│                 │
│  Clear Tokens   │    │  + Refresh Btn   │    │  SecureStore    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### About ID Tokens vs JWT

The app works with **ID Tokens** that are formatted as **JWTs**:

- **ID Token**: A specific type of token containing user identity information
- **JWT Format**: The encoding format (Header.Payload.Signature) used for the ID token
- **Purpose**: Contains user claims like name, email, profile picture, and timestamps

### Token Structure
```typescript
// What you receive from Google
const { id_token } = response.params;      // ID token in JWT format

// What you store
setIdToken(id_token);                      // Raw ID token string

// What you decode
const decoded: UserInfo = jwtDecode(id_token); // Extract user claims

// Decoded content example:
{
  "sub": "123456789",           // User's unique Google ID
  "name": "John Doe",           // User's display name
  "email": "john@example.com",  // User's email
  "picture": "https://...",     // Profile picture URL
  "iat": 1234567890,           // Issued at timestamp
  "exp": 1234567890            // Expiration timestamp
}
```

### Platform-Specific Behavior

📱 **Mobile (iOS/Android):**
- May not always receive refresh tokens (depends on Google's policies)
- If no refresh token is available, app shows appropriate message
- Secure storage using Expo SecureStore

🌐 **Web:**
- Uses Authorization Code flow with `access_type: 'offline'` and `prompt: 'consent'`
- **Reliably receives refresh tokens** for token refresh functionality
- Storage using browser localStorage

### Token Management

✅ **Refresh Token Support:**
- **"Refresh Token" button** available in user profile
- Automatically refreshes ID token and user information
- Securely stores refresh tokens using platform-appropriate storage
- Handles refresh failures gracefully with re-authentication prompt

🔄 **Token Expiration Handling:**
- ID tokens typically expire after 1 hour
- Use refresh button to get new tokens without re-authentication
- Automatic fallback to sign-in if refresh fails

## Implementation Details

### Environment Variables Required

You'll need a **client secret** for web platform to enable Authorization Code flow:

```env
EXPO_PUBLIC_WEB_CLIENT_ID=your_web_client_id_here
EXPO_PUBLIC_IOS_CLIENT_ID=your_ios_client_id_here
EXPO_PUBLIC_ANDROID_CLIENT_ID=your_android_client_id_here
EXPO_PUBLIC_CLIENT_SECRET=your_web_client_secret_here  # Required for web refresh tokens
```

### Token Expiration Utility

The app includes built-in token management, but you can also check token expiration manually:

```typescript
// Check if ID token is expired
const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
};
```

### Dependencies Added

The refactored app now includes:
- `expo-secure-store`: For secure token storage on mobile
- `expo-constants`: For accessing app configuration

## Troubleshooting

### Common Issues

1. **"Client ID not found" error:**
   - Ensure `.env` file exists with correct client IDs
   - Verify client IDs in Google Cloud Console

2. **Android build issues:**
   - Check that the SHA-1 fingerprint matches your keystore
   - Ensure package name matches `com.anonymous.googleauthdemo`

3. **iOS build issues:**
   - Verify bundle identifier matches `com.anonymous.googleauthdemo`
   - Check that iOS client ID is correctly configured

4. **Web authentication not working:**
   - Ensure web client ID is correctly set
   - Check that the domain is added to authorized origins

### Getting SHA-1 Fingerprint

For development (debug keystore):
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

For production:
```bash
keytool -list -v -keystore /path/to/your/keystore -alias your-alias
```

## Security Considerations

- Never commit `.env` file to version control
- Use different client IDs for development and production
- Regularly rotate OAuth credentials
- Implement proper token validation on your backend

## Dependencies

### Main Dependencies
- `expo`: Expo SDK and development tools
- `expo-auth-session`: OAuth authentication with platform-specific flows
- `expo-web-browser`: Web browser integration for OAuth flow
- `expo-secure-store`: Secure token storage on mobile devices
- `expo-constants`: Access to app configuration and schemes
- `jwt-decode`: Decoding ID tokens (JWT format) to extract user claims
- `react-native`: React Native framework for cross-platform development

### Development Dependencies
- `@babel/core`: JavaScript compiler
- `@types/react`: TypeScript definitions
- `typescript`: TypeScript language

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on all platforms
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the [Expo Documentation](https://docs.expo.dev/)
- Review [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- Open an issue in the repository

## Screenshots

The app includes:
- **Welcome screen** with Google-styled sign-in button
- **User profile screen** displaying:
  - Profile picture from Google account
  - User's name and email
  - Raw ID token (JWT format) for debugging
  - **"Refresh Token" button** for token refresh functionality
  - **"Sign Out" button** for authentication clearing
- **Responsive design** with ScrollView for all screen sizes
- **Real-time token refresh** and user info updates
- **Secure token storage** across app sessions

---

**Note:** This is a demonstration app using platform-specific OAuth flows for educational purposes. This implementation:
- **DOES provide refresh tokens** on web platform (Authorization Code flow)
- **May provide refresh tokens** on mobile platforms (depends on Google policies)
- Features **token refresh functionality** with manual refresh button
- Includes **secure token storage** for persistent authentication
- Suitable for production apps with proper error handling and security considerations
- Demonstrates best practices for cross-platform OAuth implementation 