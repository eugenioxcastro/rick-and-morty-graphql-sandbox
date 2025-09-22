import React from 'react'
import { StyleSheet, View } from 'react-native'

/**
 * Card Atom
 *
 * A reusable card container with consistent styling.
 * Provides the base card design across the app.
 */

interface CardProps {
	children: React.ReactNode
	variant?: 'default' | 'elevated' | 'outlined'
	padding?: number
	margin?: number
	style?: any
}

export default function Card({
	children,
	variant = 'default',
	padding = 20,
	margin = 16,
	style,
}: CardProps) {
	return (
		<View
			style={[
				styles.base,
				styles[variant],
				{
					padding,
					marginHorizontal: margin,
					marginVertical: margin / 2,
				},
				style,
			]}
		>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	base: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
	},
	default: {
		borderWidth: 1,
		borderColor: '#F1F5F9',
	},
	elevated: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.12,
		shadowRadius: 8,
		elevation: 8,
		borderWidth: 1,
		borderColor: '#F1F5F9',
	},
	outlined: {
		borderWidth: 2,
		borderColor: '#E5E7EB',
	},
})
