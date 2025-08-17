# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
yarn start
# or for specific platforms
yarn android    # Start Android development
yarn ios        # Start iOS development
yarn web        # Start web development
```

**Note**: This is an Expo project - ensure you have Expo CLI installed and the Expo Go app for testing.

## Project Architecture

**Memorate** is a React Native mobile app built with Expo for tracking personal purchases and experiences. The app follows a feature-based architecture with TypeScript throughout.

### Core Structure
- **Entry Point**: `App.tsx` (root) → `src/app/App.tsx` → `AppNavigator.tsx`
- **Navigation**: Stack-based navigation with modals using React Navigation v6
- **State Management**: React Context for categories and sorting (no Redux)
- **Data Persistence**: Firebase Firestore for categories, local storage for notes
- **Styling**: StyleSheet with centralized theme system

### Key Directories

- `src/features/` - Main app screens organized by feature:
  - `home/` - Note listing with filtering and sorting
  - `addNote/` - Note creation/editing with image upload
  - `noteDetails/` - Individual note view
- `src/contexts/` - React Context providers (SortContext)
- `src/hooks/` - Custom hooks (`useCategories`, `useAnimations`)
- `src/modals/` - Overlay modals for filtering and category management
- `src/ui/` - Reusable components (Button, Input, ImagePicker, etc.)
- `src/services/` - External service configurations (Firebase)
- `src/theme/` - Centralized styling constants and global styles
- `src/utils/` - Utility functions (Cloudinary integration, formatting)

### Data Models

**Note Interface** (`src/navigation/AppNavigator.tsx:13-25`):
```typescript
interface Note {
    id: string
    name: string
    comment: string
    rating: number
    image?: string
    tags: string[]
    created?: Date
    edited?: Date
    price?: number
    currency?: '€' | '$' | '₴'
    category?: string
}
```

**Navigation Types** defined in `AppNavigator.tsx` for type-safe routing.

### External Services
- **Firebase**: Categories management via Firestore
- **Cloudinary**: Image uploads and storage
- **Environment Variables**: Uses `react-native-dotenv` for Firebase config

### Styling System
- Centralized theme in `src/theme/index.ts`
- Global styles with consistent colors, borders, and fonts
- Uses Inter font family throughout
- Color scheme: Primary (#FF6F61), background (#F8FAFC)

### Path Aliases
- `@/*` maps to `src/*` (configured in `tsconfig.json` and `babel.config.js`)

### Key Context Providers
- `CategoriesProvider` - Firebase-based category management
- `SortProvider` - Note sorting state (by date, price, rating)

The app is designed as "offline-first" with cloud sync capabilities, focusing on quick capture of purchase experiences with photos, ratings, and notes.