import { Error } from '@/components/organisms'
import CharacterCard from '@/components/organisms/CharacterCard'
import Loader from '@/components/organisms/Loader'
import { ThemedText } from '@/components/themed-text'
import { useFavorites } from '@/context/FavoritesContext'
import { GET_CHARACTERS } from '@/graphql/queries'
import {
	Character,
	CharactersResponse,
	GetCharactersVariables,
} from '@/types/character'
import { useQuery } from '@apollo/client/react'
import React from 'react'
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

function FavoritesScreen() {
	const { isFavorite } = useFavorites()
	const { loading, error, data, refetch } = useQuery<
		CharactersResponse,
		GetCharactersVariables
	>(GET_CHARACTERS, {
		variables: { page: 1 },
		errorPolicy: 'all',
	})
	const renderFavoriteCharacter = ({ item }: { item: Character }) => (
		<CharacterCard character={item} />
	)
	const keyExtractor = (item: Character) => item.id
	if (loading) {
		return (
			<Loader
				message="Loading favorites..."
				backgroundColor="#F8FAFC"
				statusBarStyle="dark-content"
			/>
		)
	}

	if (error) {
		return (
			<Error
				message={`Error loading favorites: ${error.message}`}
				backgroundColor="#F8FAFC"
				statusBarStyle="dark-content"
				buttonText="Retry"
				onButtonPress={() => refetch()}
			/>
		)
	}

	// Filter characters to show only favorites
	const allCharacters = data?.characters?.results || []
	const favoriteCharacters = allCharacters.filter((character) =>
		isFavorite(character.id)
	)

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
					Favorite Rick & Morty Characters
				</ThemedText>
				<ThemedText style={styles.subtitle}>
					{favoriteCharacters.length === 0
						? 'No favorites yet - tap the heart on any character to add them!'
						: `${favoriteCharacters.length} favorite character${
								favoriteCharacters.length === 1 ? '' : 's'
						  }`}
				</ThemedText>
				<View style={styles.headerDecorator} />
			</Animated.View>

			{favoriteCharacters.length === 0 ? (
				<Animated.View
					entering={FadeInDown.delay(300)}
					style={styles.emptyStateContainer}
				>
					<Text style={styles.emptyStateTitle}>No Favorites Yet</Text>
					<Text style={styles.emptyStateMessage}>
						Go to the Characters tab and tap the heart icon on any character to
						add them to your favorites!
					</Text>
				</Animated.View>
			) : (
				<Animated.View
					entering={FadeInDown.delay(300)}
					style={styles.listWrapper}
				>
					<FlatList
						data={favoriteCharacters}
						renderItem={renderFavoriteCharacter}
						keyExtractor={keyExtractor}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.listContent}
					/>
				</Animated.View>
			)}
		</SafeAreaView>
	)
}

export default FavoritesScreen

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
		backgroundColor: '#EF4444',
		borderRadius: 2,
		alignSelf: 'center',
	},
	listWrapper: {
		flex: 1,
	},
	listContent: {
		paddingVertical: 16,
	},
	emptyStateContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 40,
	},
	emptyStateIcon: {
		fontSize: 64,
		marginBottom: 16,
	},
	emptyStateTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#1F2937',
		marginBottom: 12,
		textAlign: 'center',
	},
	emptyStateMessage: {
		fontSize: 16,
		color: '#6B7280',
		textAlign: 'center',
		lineHeight: 24,
	},
})
