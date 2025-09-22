import React, { createContext, useContext, useState } from 'react'

/**
 * Favorites Context
 *
 * Simple React Context solution for managing character favorites.
 * This approach is more reliable than Apollo local state for this use case.
 *
 * Features:
 * - Real-time updates across components
 * - Simple toggle functionality
 * - TypeScript support
 * - No external dependencies
 */

interface FavoritesContextType {
	favorites: Set<string>
	toggleFavorite: (characterId: string) => void
	isFavorite: (characterId: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
	undefined
)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
	const [favorites, setFavorites] = useState<Set<string>>(new Set())

	const toggleFavorite = (characterId: string) => {
		setFavorites((prev) => {
			const newFavorites = new Set(prev)

			if (newFavorites.has(characterId)) {
				newFavorites.delete(characterId)
			} else {
				newFavorites.add(characterId)
			}

			return newFavorites
		})
	}

	const isFavorite = (characterId: string) => {
		return favorites.has(characterId)
	}

	return (
		<FavoritesContext.Provider
			value={{ favorites, toggleFavorite, isFavorite }}
		>
			{children}
		</FavoritesContext.Provider>
	)
}

export function useFavorites() {
	const context = useContext(FavoritesContext)
	if (context === undefined) {
		throw new Error('useFavorites must be used within a FavoritesProvider')
	}
	return context
}
