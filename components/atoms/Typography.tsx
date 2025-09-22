import React from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

/**
 * Typography Atoms
 *
 * Reusable text components with consistent styling.
 * Provides design system typography across the app.
 */

interface TypographyProps extends TextProps {
	children: React.ReactNode
	variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label'
	color?: string
	weight?: 'normal' | 'medium' | 'bold'
}

export function Typography({
	children,
	variant = 'body',
	color,
	weight,
	style,
	...props
}: TypographyProps) {
	return (
		<Text
			style={[
				styles.base,
				styles[variant],
				color && { color },
				weight && { fontWeight: weights[weight] },
				style,
			]}
			{...props}
		>
			{children}
		</Text>
	)
}

// Specific typography components for common use cases
export function CharacterName({
	children,
	...props
}: Omit<TypographyProps, 'variant'>) {
	return (
		<Typography
			variant="h3"
			weight="bold"
			color="#1F2937"
			{...props}
		>
			{children}
		</Typography>
	)
}

export function StatusText({
	children,
	...props
}: Omit<TypographyProps, 'variant'>) {
	return (
		<Typography
			variant="body"
			weight="medium"
			color="#4B5563"
			{...props}
		>
			{children}
		</Typography>
	)
}

export function OriginText({
	children,
	...props
}: Omit<TypographyProps, 'variant'>) {
	return (
		<Typography
			variant="caption"
			color="#6B7280"
			style={{ fontStyle: 'italic' }}
			{...props}
		>
			{children}
		</Typography>
	)
}

const weights = {
	normal: '400' as const,
	medium: '500' as const,
	bold: 'bold' as const,
}

const styles = StyleSheet.create({
	base: {
		fontFamily: 'System',
	},
	h1: {
		fontSize: 32,
		lineHeight: 40,
	},
	h2: {
		fontSize: 28,
		lineHeight: 36,
	},
	h3: {
		fontSize: 18,
		lineHeight: 24,
	},
	body: {
		fontSize: 14,
		lineHeight: 20,
	},
	caption: {
		fontSize: 12,
		lineHeight: 16,
	},
	label: {
		fontSize: 11,
		lineHeight: 14,
		textTransform: 'uppercase',
		letterSpacing: 0.5,
	},
})
