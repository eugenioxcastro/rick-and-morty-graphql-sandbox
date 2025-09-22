import { Typography } from '@/components/atoms/Typography'
import React from 'react'
import { StyleSheet, View } from 'react-native'

/**
 * ErrorState Atom
 *
 * A reusable error display component.
 * Provides consistent error messaging across the app.
 */

interface ErrorStateProps {
	title?: string
	message: string
	hint?: string
	centered?: boolean
}

export default function ErrorState({
	title = 'Oops! Something went wrong',
	message,
	hint,
	centered = true,
}: ErrorStateProps) {
	const Container = centered ? View : React.Fragment
	const containerStyle = centered ? styles.centered : undefined

	return (
		<Container style={containerStyle}>
			<Typography
				variant="h3"
				weight="bold"
				color="#DC2626"
				style={styles.title}
			>
				{title}
			</Typography>

			<Typography
				variant="body"
				color="#6B7280"
				style={styles.message}
			>
				{message}
			</Typography>

			{hint && (
				<Typography
					variant="caption"
					color="#9CA3AF"
					style={styles.hint}
				>
					{hint}
				</Typography>
			)}
		</Container>
	)
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F9FAFB',
		paddingHorizontal: 20,
	},
	title: {
		marginBottom: 8,
		textAlign: 'center',
	},
	message: {
		textAlign: 'center',
		marginBottom: 8,
	},
	hint: {
		textAlign: 'center',
		fontStyle: 'italic',
	},
})
