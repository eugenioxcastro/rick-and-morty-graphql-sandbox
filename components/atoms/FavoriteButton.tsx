import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

/**
 * FavoriteButton Atom
 *
 * A reusable favorite toggle button with heart animation.
 * Provides consistent favorite functionality across the app.
 */

interface FavoriteButtonProps {
	isFavorite: boolean
	onPress: () => void
	size?: number
	variant?: 'default' | 'large'
}

export default function FavoriteButton({
	isFavorite,
	onPress,
	size = 24,
	variant = 'default',
}: FavoriteButtonProps) {
	const scale = useSharedValue(1)

	const handlePress = () => {
		scale.value = withSpring(0.7, {}, () => {
			scale.value = withSpring(1)
		})
		onPress()
	}

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}))

	return (
		<Animated.View style={animatedStyle}>
			<Pressable
				style={[styles.button, variant === 'large' && styles.buttonLarge]}
				onPress={handlePress}
				hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
			>
				<Text style={[styles.icon, { fontSize: size }]}>
					{isFavorite ? '❤️' : '🤍'}
				</Text>
			</Pressable>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 12,
		backgroundColor: 'rgba(59, 130, 246, 0.1)',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: 'rgba(59, 130, 246, 0.2)',
	},
	buttonLarge: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: 'rgba(255, 255, 255, 0.95)',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	icon: {
		textAlign: 'center',
	},
})
