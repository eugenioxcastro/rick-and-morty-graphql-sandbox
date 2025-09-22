import StatusDot from '@/components/atoms/StatusDot'
import { StatusText } from '@/components/atoms/Typography'
import { Character } from '@/types/character'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface StatusIndicatorProps {
	status: Character['status']
	species: string
	showSpecies?: boolean
}

export default function StatusIndicator({
	status,
	species,
	showSpecies = true,
}: StatusIndicatorProps) {
	const getStatusColor = (status: Character['status']) => {
		switch (status) {
			case 'Alive':
				return '#10B981'
			case 'Dead':
				return '#EF4444'
			default:
				return '#6B7280'
		}
	}

	const statusText = showSpecies ? `${status} - ${species}` : status

	return (
		<View style={styles.container}>
			<StatusDot color={getStatusColor(status)} />
			<StatusText>{statusText}</StatusText>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 4,
	},
})
