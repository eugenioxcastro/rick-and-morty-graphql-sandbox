import CharacterCard from '@/components/organisms/CharacterCard'
import Error from '@/components/organisms/Error'
import Loader from '@/components/organisms/Loader'
import { GET_CHARACTERS } from '@/graphql/queries'
import {
	Character,
	CharactersResponse,
	GetCharactersVariables,
} from '@/types/character'
import { useQuery } from '@apollo/client/react'
import React from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'

export default function CharactersList() {
	const { loading, error, data, refetch } = useQuery<
		CharactersResponse,
		GetCharactersVariables
	>(GET_CHARACTERS, {
		errorPolicy: 'all',
		notifyOnNetworkStatusChange: true,
	})

	const renderCharacter = ({ item }: { item: Character }) => (
		<CharacterCard character={item} />
	)

	const keyExtractor = (item: Character) => item.id

	if (loading && !data) {
		return (
			<Loader
				message="Loading characters..."
				backgroundColor="#F8FAFC"
				statusBarStyle="dark-content"
			/>
		)
	}

	if (error && !data) {
		return (
			<Error
				message={error.message || 'Failed to load characters'}
				hint="Pull down to try again"
				backgroundColor="#F8FAFC"
				statusBarStyle="dark-content"
				buttonText="Retry"
				onButtonPress={() => refetch()}
			/>
		)
	}

	const characters = data?.characters?.results || []

	return (
		<View style={styles.container}>
			<FlatList
				data={characters}
				renderItem={renderCharacter}
				keyExtractor={keyExtractor}
				refreshControl={
					<RefreshControl
						refreshing={loading}
						onRefresh={refetch}
						colors={['#3B82F6']}
						tintColor="#3B82F6"
					/>
				}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8FAFC',
	},
	listContent: {
		paddingVertical: 16,
	},
})
