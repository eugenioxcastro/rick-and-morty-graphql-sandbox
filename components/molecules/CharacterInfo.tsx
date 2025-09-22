import { CharacterName, OriginText } from '@/components/atoms/Typography'
import StatusIndicator from '@/components/molecules/StatusIndicator'
import { Character } from '@/types/character'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface CharacterInfoProps {
	character: Character
	showOrigin?: boolean
}

export default function CharacterInfo({
	character,
	showOrigin = true,
}: CharacterInfoProps) {
	return (
		<View style={styles.container}>
			<CharacterName numberOfLines={1}>{character.name}</CharacterName>

			<StatusIndicator
				status={character.status}
				species={character.species}
			/>

			{showOrigin && (
				<OriginText numberOfLines={1}>From: {character.origin.name}</OriginText>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
})
