import React from 'react'
import { StyleSheet, View } from 'react-native'

/**
 * StatusDot Atom
 *
 * A small colored dot used to indicate character status.
 * Reusable across different status indicators.
 */

interface StatusDotProps {
	color: string
	size?: number
}

export default function StatusDot({ color, size = 8 }: StatusDotProps) {
	return (
		<View
			style={[
				styles.dot,
				{
					backgroundColor: color,
					width: size,
					height: size,
					borderRadius: size / 2,
				},
			]}
		/>
	)
}

const styles = StyleSheet.create({
	dot: {
		marginRight: 8,
	},
})
