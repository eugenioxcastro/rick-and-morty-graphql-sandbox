import AnimatedPressable from '@/components/atoms/AnimatedPressable'
import Card from '@/components/atoms/Card'
import CharacterCardContent from '@/components/molecules/CharacterCardContent'
import { useFavorites } from '@/context/FavoritesContext'
import { Character } from '@/types/character'
import { useRouter } from 'expo-router'
import React from 'react'

interface CharacterCardProps {
	character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
	const { toggleFavorite, isFavorite } = useFavorites()
	const router = useRouter()

	const handleCardPress = () => {
		router.push({
			pathname: '/character/[id]',
			params: { id: character.id },
		})
	}

	const handleFavoriteToggle = () => {
		toggleFavorite(character.id)
	}

	return (
		<AnimatedPressable onPress={handleCardPress}>
			<Card variant="elevated">
				<CharacterCardContent
					character={character}
					isFavorite={isFavorite(character.id)}
					onFavoriteToggle={handleFavoriteToggle}
				/>
			</Card>
		</AnimatedPressable>
	)
}
