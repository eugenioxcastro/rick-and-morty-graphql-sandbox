import CharacterAvatar from '@/components/atoms/CharacterAvatar'
import FavoriteButton from '@/components/atoms/FavoriteButton'
import CharacterInfo from '@/components/molecules/CharacterInfo'
import { Character } from '@/types/character'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface CharacterCardContentProps {
	character: Character
	isFavorite: boolean
	onFavoriteToggle: () => void
	onFavoritePress?: (e: any) => void
}

export default function CharacterCardContent({
	character,
	isFavorite,
	onFavoriteToggle,
	onFavoritePress,
}: CharacterCardContentProps) {
	const handleFavoritePress = (e?: any) => {
		e?.stopPropagation?.()
		onFavoritePress?.(e)
		onFavoriteToggle()
	}

	return (
		<View style={styles.container}>
			<CharacterAvatar uri={character.image} />

			<CharacterInfo character={character} />

			<View style={styles.favoriteContainer}>
				<FavoriteButton
					isFavorite={isFavorite}
					onPress={handleFavoritePress}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	favoriteContainer: {
		marginLeft: 12,
	},
})
