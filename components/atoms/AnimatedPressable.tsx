import React from 'react'
import { Pressable, PressableProps } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

/**
 * AnimatedPressable Atom
 *
 * A reusable pressable component with scale animation.
 * Provides consistent press feedback across the app.
 */

interface AnimatedPressableProps extends PressableProps {
	children: React.ReactNode
	style?: any
	scaleValue?: number
	duration?: number
}

export default function AnimatedPressable({
	children,
	style,
	scaleValue = 0.96,
	duration = 150,
	onPressIn,
	onPressOut,
	...props
}: AnimatedPressableProps) {
	const scale = useSharedValue(1)

	const handlePressIn = (e: any) => {
		scale.value = withTiming(scaleValue, { duration })
		onPressIn?.(e)
	}

	const handlePressOut = (e: any) => {
		scale.value = withTiming(1, { duration })
		onPressOut?.(e)
	}

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}))

	return (
		<Animated.View style={[animatedStyle, style]}>
			<Pressable
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				{...props}
			>
				{children}
			</Pressable>
		</Animated.View>
	)
}
