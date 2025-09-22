import CharactersList from '@/components/organisms/CharactersList'
import { ThemedText } from '@/components/themed-text'
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

function HomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle="dark-content"
				backgroundColor="#FFFFFF"
			/>

			<Animated.View
				entering={FadeInUp.duration(800)}
				style={styles.header}
			>
				<ThemedText
					type="title"
					style={styles.title}
				>
					🛸 Rick & Morty
				</ThemedText>
				<ThemedText style={styles.subtitle}>
					Explore characters from the multiverse
				</ThemedText>
				<View style={styles.headerDecorator} />
			</Animated.View>

			<Animated.View
				entering={FadeInDown.delay(300).duration(800)}
				style={styles.listContainer}
			>
				<CharactersList/>
			</Animated.View>
		</SafeAreaView>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8FAFC',
	},
	header: {
		paddingHorizontal: 24,
		paddingTop: 20,
		paddingBottom: 24,
		backgroundColor: '#FFFFFF',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
		position: 'relative',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#1F2937',
		marginBottom: 8,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 16,
		color: '#6B7280',
		fontWeight: '500',
		textAlign: 'center',
		marginBottom: 16,
	},
	headerDecorator: {
		width: 60,
		height: 4,
		backgroundColor: '#3B82F6',
		borderRadius: 2,
		alignSelf: 'center',
	},
	listContainer: {
		flex: 1,
		backgroundColor: '#F8FAFC',
	},
})
