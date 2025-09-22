import ErrorState from '@/components/atoms/ErrorState'
import { Typography } from '@/components/atoms/Typography'
import React from 'react'
import { Pressable, StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ErrorProps {
	title?: string
	message: string
	hint?: string
	buttonText?: string
	onButtonPress?: () => void
	backgroundColor?: string
	statusBarStyle?: 'light-content' | 'dark-content'
}

export default function Error({
	title,
	message,
	hint,
	buttonText = 'Go Back',
	onButtonPress,
	backgroundColor = '#1F2937',
	statusBarStyle = 'light-content',
}: ErrorProps) {
	return (
		<SafeAreaView style={[styles.container, { backgroundColor }]}>
			<StatusBar
				barStyle={statusBarStyle}
				backgroundColor={backgroundColor}
			/>
			<ErrorState
				title={title}
				message={message}
				hint={hint}
			/>
			{onButtonPress && (
				<Pressable
					style={styles.button}
					onPress={onButtonPress}
				>
					<Typography
						variant="body"
						weight="medium"
						style={styles.buttonText}
					>
						{buttonText}
					</Typography>
				</Pressable>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	button: {
		backgroundColor: '#3B82F6',
		paddingHorizontal: 24,
		paddingVertical: 12,
		borderRadius: 8,
		marginHorizontal: 20,
		marginBottom: 40,
		alignItems: 'center',
	},
	buttonText: {
		color: '#FFFFFF',
	},
})
