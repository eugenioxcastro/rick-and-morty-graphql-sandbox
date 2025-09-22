# 🛸 Rick & Morty GraphQL Demo App

A demo React Native application showcasing **GraphQL**, **Atomic Design**, and **Context State Management** using the Rick and Morty API.

## Demo Video

![Demo](./assets/readme/demo.gif)

## 📱 Features

- **Character Browsing**: Explore characters from the Rick and Morty universe
- **Character Details**: View detailed information including episodes, origin, and location
- **Favorites System**: Mark characters as favorites with real-time updates
- **Atomic Design**: Clean, reusable component architecture

## 🏗️ Architecture

### **GraphQL with Apollo Client**

- **Server Data**: Fetches characters, episodes, and locations from [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql)
- **Apollo Client**: Handles GraphQL queries, caching, and error management
- **Type Safety**: Full TypeScript integration with generated types

### **Favorites Management**

- **React Context**: Simple and reliable state management for favorites
- **Real-time Updates**: Instant UI changes across all components
- **Persistent State**: Favorites maintained during app session

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd graphql-sandbox
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - **iOS**: Press `i` or scan QR code with Camera app
   - **Android**: Press `a` or scan QR code with Expo Go app
   - **Web**: Press `w` to open in browser

## 🔧 Key Technologies

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **Apollo Client** - GraphQL client with caching
- **TypeScript** - Type safety and better DX
- **React Context** - State management for favorites
- **React Native Reanimated** - Smooth animations
- **Expo Router** - File-based navigation

## 📱 App Structure

### **Screens**

- **Home** (`/`) - Character list with search and filtering
- **Favorites** (`/favorites`) - Favorited characters
- **Character Detail** (`/character/[id]`) - Detailed character information

### **State Management**

#### **GraphQL (Apollo Client)**

```typescript
// Fetching characters
const { loading, error, data } = useQuery(GET_CHARACTERS)

// Character data automatically cached and shared
```

#### **Favorites (React Context)**

```typescript
// Using favorites context
const { toggleFavorite, isFavorite } = useFavorites()

// Toggle favorite status
const handleFavorite = () => toggleFavorite(characterId)

// Check if character is favorited
const isCharacterFavorite = isFavorite(characterId)
```

### **Component Examples**

#### **Atomic Design in Action**

```typescript
// Organism: Complete character card
<CharacterCard character={character} />

// Built from:
// - AnimatedPressable (Atom)
// - Card (Atom)
// - CharacterCardContent (Molecule)
//   - CharacterAvatar (Atom)
//   - CharacterInfo (Molecule)
//   - FavoriteButton (Atom)
```

#### **GraphQL Query**

```typescript
const GET_CHARACTERS = gql`
	query GetCharacters($page: Int) {
		characters(page: $page) {
			results {
				id
				name
				status
				species
				image
				origin {
					name
				}
			}
		}
	}
`
```

## 📝 GraphQL Benefits Demonstrated

1. **Precise Data Fetching** - Request only needed fields
2. **Single Endpoint** - One URL for all data needs
3. **Type Safety** - Generated TypeScript types

## 🔄 Favorites System Flow

1. **User taps heart** on any character card
2. **Context updates** favorites Set with character ID
3. **All components re-render** automatically showing new state
4. **Favorites page** filters and displays favorited characters
5. **State persists** throughout app session
