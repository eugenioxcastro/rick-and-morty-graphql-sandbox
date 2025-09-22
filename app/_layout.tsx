import { ApolloProvider } from '@apollo/client/react'
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import { FavoritesProvider } from '../context/FavoritesContext'
import { client } from '../lib/apollo'

import { useColorScheme } from '@/hooks/use-color-scheme'

export const unstable_settings = {
	anchor: '(tabs)',
}

export default function RootLayout() {
	const colorScheme = useColorScheme()

	return (
		<ApolloProvider client={client}>
			<FavoritesProvider>
				<ThemeProvider
					value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
				>
					<Stack>
						<Stack.Screen
							name="(tabs)"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="character/[id]"
							options={{ headerShown: false }}
						/>
					</Stack>
					<StatusBar style="auto" />
				</ThemeProvider>
			</FavoritesProvider>
		</ApolloProvider>
	)
}
