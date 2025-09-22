import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface LoaderProps {
	message?: string
	backgroundColor?: string
	statusBarStyle?: 'light-content' | 'dark-content'
}

export default function Loader({
	message = 'Loading...',
	backgroundColor = '#1F2937',
	statusBarStyle = 'light-content',
}: LoaderProps) {
	return (
		<SafeAreaView style={[styles.container, { backgroundColor }]}>
			<StatusBar
				barStyle={statusBarStyle}
				backgroundColor={backgroundColor}
			/>
			<LoadingSpinner text={message} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
