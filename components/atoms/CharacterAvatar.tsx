import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet } from 'react-native'

/**
 * CharacterAvatar Atom
 *
 * A reusable character avatar component with consistent styling.
 * Used across character cards and detail screens.
 */

interface CharacterAvatarProps {
	uri: string
	size?: number
	borderWidth?: number
	borderColor?: string
}

export default function CharacterAvatar({
	uri,
	size = 84,
	borderWidth = 3,
	borderColor = '#F8FAFC',
}: CharacterAvatarProps) {
	return (
		<Image
			source={{ uri }}
			style={[
				styles.avatar,
				{
					width: size,
					height: size,
					borderRadius: size / 2,
					borderWidth,
					borderColor,
				},
			]}
			contentFit="cover"
			transition={300}
		/>
	)
}

const styles = StyleSheet.create({
	avatar: {
		marginRight: 20,
	},
})
