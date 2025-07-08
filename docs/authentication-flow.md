# Authentication Flow Diagram

This document provides visual diagrams explaining how Google OAuth authentication works in this React Native Expo app.

## Overall Authentication Flow

```mermaid
graph TD
    A[App Starts] --> B{User Authenticated?}
    B -->|No| C[Show SignInScreen]
    B -->|Yes| D[Show UserProfileScreen]
    
    C --> E[User taps 'Sign in with Google']
    E --> F[useAuth Hook Triggered]
    F --> G{Platform Check}
    
    G -->|Web| H[Authorization Code Flow]
    G -->|Mobile| I[Standard OAuth Flow]
    
    H --> J[Google OAuth with ResponseType.Code]
    I --> K[Google OAuth Direct]
    
    J --> L[User Authenticates]
    K --> L
    
    L --> M[Google Returns Response]
    M --> N{Platform Check}
    
    N -->|Web| O[Authorization Code + Refresh Token]
    N -->|Mobile| P[ID Token + Maybe Refresh Token]
    
    O --> Q[Store Tokens Securely]
    P --> Q
    
    Q --> R[Decode ID Token]
    R --> S[Extract User Info]
    S --> D
    
    D --> T[User can Refresh Token]
    D --> U[User can Sign Out]
    
    T --> V[Token Refresh Flow]
    U --> W[Clear Tokens & Return to SignIn]
```

## Platform-Specific Authentication Details

### Web Platform (Authorization Code Flow)

```mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant G as Google OAuth
    participant S as Token Storage
    
    U->>A: Tap "Sign in with Google"
    A->>G: Request with ResponseType.Code<br/>access_type: 'offline'<br/>prompt: 'consent'
    G->>U: Show OAuth consent screen
    U->>G: Grant permissions
    G->>A: Return Authorization Code
    A->>G: Exchange code for tokens
    G->>A: Return ID Token + Access Token + Refresh Token
    A->>S: Store refresh token (localStorage)
    A->>A: Decode ID token with jwt-decode
    A->>U: Show user profile with refresh capability
```

### Mobile Platform (iOS/Android)

```mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant G as Google OAuth
    participant S as Secure Store
    
    U->>A: Tap "Sign in with Google"
    A->>G: Standard OAuth request
    G->>U: Show OAuth screen
    U->>G: Grant permissions
    G->>A: Return tokens directly
    Note over G,A: May include refresh token<br/>(depends on Google policies)
    A->>S: Store tokens (SecureStore)
    A->>A: Decode ID token with jwt-decode
    A->>U: Show user profile
```

## Token Refresh Flow

```mermaid
graph LR
    A[User taps 'Refresh Token'] --> B{Refresh Token Available?}
    B -->|No| C[Show 'No Refresh Token' Alert]
    B -->|Yes| D[Get stored refresh token]
    D --> E[Call refreshAsync with token]
    E --> F{Refresh Success?}
    F -->|Yes| G[Update ID token & user info]
    F -->|No| H[Show error & sign out user]
    G --> I[Show 'Token Refreshed!' alert]
    H --> J[Return to sign-in screen]
```

## Component Architecture Flow

```mermaid
graph TD
    subgraph "App.tsx"
        A1[Main App Component]
    end
    
    subgraph "useAuth Hook"
        B1[Platform Detection]
        B2[OAuth Request Setup]
        B3[Token Management]
        B4[User State Management]
    end
    
    subgraph "Components"
        C1[SignInScreen]
        C2[UserProfileScreen]
    end
    
    subgraph "Services"
        D1[tokenStorage]
        D2[SecureStore/localStorage]
    end
    
    A1 --> B1
    A1 --> C1
    A1 --> C2
    B1 --> B2
    B2 --> B3
    B3 --> B4
    B3 --> D1
    D1 --> D2
    
    C1 --> B2
    C2 --> B3
    C2 --> B4
```

## Token Storage Strategy

```mermaid
graph TD
    A[Token Storage Decision] --> B{Platform?}
    
    B -->|Web| C[localStorage]
    B -->|Mobile| D[Expo SecureStore]
    
    C --> E[Browser Storage<br/>- Persists across sessions<br/>- Accessible via JS<br/>- Domain-specific]
    
    D --> F[Encrypted Storage<br/>- Hardware-backed security<br/>- Requires device unlock<br/>- App-specific]
    
    E --> G[Store refresh token string]
    F --> G
    
    G --> H[Retrieve when refreshing]
    H --> I[Delete on sign out]
```

## Error Handling Flow

```mermaid
graph TD
    A[Authentication Error] --> B{Error Type?}
    
    B -->|OAuth Error| C[Show OAuth error message]
    B -->|Network Error| D[Show network error]
    B -->|Token Expired| E[Attempt refresh]
    B -->|Refresh Failed| F[Force re-authentication]
    
    C --> G[Log error details]
    D --> G
    E --> H{Refresh Success?}
    F --> I[Clear tokens & show sign-in]
    
    H -->|Yes| J[Continue with new tokens]
    H -->|No| F
    
    G --> K[User can retry]
    J --> L[Update UI with fresh data]
```

## Security Considerations

```mermaid
graph LR
    subgraph "Security Measures"
        A[Environment Variables<br/>for Client IDs]
        B[Secure Token Storage<br/>SecureStore/localStorage]
        C[HTTPS/TLS<br/>for all communications]
        D[Token Expiration<br/>Checking]
        E[Refresh Token<br/>Rotation]
    end
    
    A --> F[Prevents credential exposure]
    B --> G[Protects stored tokens]
    C --> H[Secure data transmission]
    D --> I[Automatic session management]
    E --> J[Enhanced security]
```

## Key Features Summary

- **🔄 Platform-Specific Flows**: Web uses Authorization Code flow, Mobile uses standard OAuth
- **💾 Secure Storage**: SecureStore on mobile, localStorage on web
- **🔄 Token Refresh**: Manual refresh button with automatic token updates
- **🔒 Security**: Environment variables, secure storage, HTTPS communications
- **📱 Cross-Platform**: Consistent experience across iOS, Android, and Web
- **🎯 User-Friendly**: Clear error messages and intuitive UI flow

## Environment Variables Required

```
EXPO_PUBLIC_WEB_CLIENT_ID=your_web_client_id
EXPO_PUBLIC_IOS_CLIENT_ID=your_ios_client_id  
EXPO_PUBLIC_ANDROID_CLIENT_ID=your_android_client_id
EXPO_PUBLIC_CLIENT_SECRET=your_web_client_secret  # Required for web refresh tokens
```

---

*This diagram helps visualize the complete authentication flow and can be referenced when debugging or extending the authentication functionality.* 