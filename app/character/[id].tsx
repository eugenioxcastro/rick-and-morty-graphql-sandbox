import { useQuery } from '@apollo/client/react'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useMemo } from 'react'
import { Pressable, ScrollView, StatusBar, Text, View } from 'react-native'
import Animated, {
	FadeInDown,
	FadeInUp,
	SlideInRight,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'

import FavoriteButton from '@/components/atoms/FavoriteButton'
import StatusDot from '@/components/atoms/StatusDot'
import { Typography } from '@/components/atoms/Typography'
import Error from '@/components/organisms/Error'
import Loader from '@/components/organisms/Loader'
import { useFavorites } from '@/context/FavoritesContext'
import { GET_CHARACTER } from '@/graphql/queries'
import { characterDetailsStyles } from '@/styles/screens/characterDetails.jss'
import { CharacterResponse, GetCharacterVariables } from '@/types/character'
import { getStatusBgColor, getStatusColor } from '@/utils/colors'

export default function CharacterDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>()
	const router = useRouter()
	const { toggleFavorite, isFavorite } = useFavorites()
	const favoriteScale = useSharedValue(1)
	const backButtonScale = useSharedValue(1)
	const styles = characterDetailsStyles

	// GraphQL query for detailed character information
	const { loading, error, data } = useQuery<
		CharacterResponse,
		GetCharacterVariables
	>(GET_CHARACTER, {
		variables: { id: id! },
		errorPolicy: 'all',
		notifyOnNetworkStatusChange: true,
	})

	const character = useMemo(() => {
		return data?.character
	}, [data])
	const isCharacterFavorite = useMemo(() => {
		return character ? isFavorite(character.id) : false
	}, [character, isFavorite])

	const handleFavoriteToggle = () => {
		if (character) {
			favoriteScale.value = withSpring(0.85, {}, () => {
				favoriteScale.value = withSpring(1)
			})
			toggleFavorite(character.id)
		}
	}

	const handleBackPress = () => {
		backButtonScale.value = withSpring(0.85, {}, () => {
			backButtonScale.value = withSpring(1)
		})
		router.back()
	}

	const favoriteAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: favoriteScale.value }],
	}))

	const backButtonAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: backButtonScale.value }],
	}))

	if (loading) {
		return <Loader message="Loading character details..." />
	}

	if (error || !character) {
		return (
			<Error
				message={error?.message || 'Character not found'}
				hint="Please try again"
				onButtonPress={() => router.back()}
			/>
		)
	}

	return (
		<View style={styles.container}>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>

			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Hero Section with Character Image */}
				<View style={styles.heroSection}>
					<LinearGradient
						colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)', 'transparent']}
						style={styles.heroGradient}
					/>

					{/* Back Button */}
					<Animated.View
						entering={FadeInUp.delay(200)}
						style={[styles.backButtonContainer, backButtonAnimatedStyle]}
					>
						<Pressable
							style={styles.headerBackButton}
							onPress={handleBackPress}
						>
							<Text style={styles.backIcon}>←</Text>
						</Pressable>
					</Animated.View>

					{/* Favorite Button */}
					<Animated.View
						entering={FadeInUp.delay(300)}
						style={[styles.favoriteButtonContainer, favoriteAnimatedStyle]}
					>
						<FavoriteButton
							isFavorite={isCharacterFavorite}
							onPress={handleFavoriteToggle}
							variant="default"
							size={22}
						/>
					</Animated.View>

					{/* Character Image */}
					<Animated.View
						entering={FadeInDown.delay(100)}
						style={styles.imageContainer}
					>
						<Image
							source={{ uri: character.image }}
							style={styles.characterImage}
							contentFit="cover"
							transition={500}
						/>
					</Animated.View>
				</View>

				{/* Character Information */}
				<View style={styles.contentContainer}>
					{/* Name and Status */}
					<Animated.View
						entering={FadeInUp.delay(400)}
						style={styles.nameSection}
					>
						<Typography
							variant="h1"
							weight="bold"
							style={styles.characterName}
						>
							{character.name}
						</Typography>
						<View
							style={[
								styles.statusBadge,
								{ backgroundColor: getStatusBgColor(character.status) },
							]}
						>
							<StatusDot color={getStatusColor(character.status)} />
							<Typography
								variant="body"
								weight="medium"
								style={[
									styles.statusText,
									{ color: getStatusColor(character.status) },
								]}
							>
								{character.status}
							</Typography>
						</View>
					</Animated.View>

					{/* Basic Info Cards */}
					<Animated.View
						entering={SlideInRight.delay(500)}
						style={styles.infoGrid}
					>
						<View style={styles.infoCard}>
							<Typography
								variant="caption"
								weight="medium"
								style={styles.infoLabel}
							>
								Species
							</Typography>
							<Typography
								variant="h3"
								weight="bold"
								style={styles.infoValue}
							>
								{character.species}
							</Typography>
						</View>
						<View style={styles.infoCard}>
							<Typography
								variant="caption"
								weight="medium"
								style={styles.infoLabel}
							>
								Gender
							</Typography>
							<Typography
								variant="h3"
								weight="bold"
								style={styles.infoValue}
							>
								{character.gender}
							</Typography>
						</View>
					</Animated.View>

					{/* Origin & Location */}
					<Animated.View entering={FadeInUp.delay(600)}>
						<Typography
							variant="h2"
							weight="bold"
							style={styles.sectionTitle}
						>
							Origin & Location
						</Typography>
						<View style={styles.locationContainer}>
							<View style={styles.locationCard}>
								<Typography
									variant="caption"
									weight="medium"
									style={styles.locationLabel}
								>
									Origin
								</Typography>
								<Typography
									variant="h3"
									weight="bold"
									style={styles.locationName}
								>
									{character.origin.name}
								</Typography>
								{character.origin.type && (
									<Typography
										variant="body"
										weight="medium"
										style={styles.locationType}
									>
										{character.origin.type}
									</Typography>
								)}
								{character.origin.dimension && (
									<Typography
										variant="caption"
										style={styles.locationDimension}
									>
										{character.origin.dimension}
									</Typography>
								)}
							</View>

							{character.location && (
								<View style={styles.locationCard}>
									<Typography
										variant="caption"
										weight="medium"
										style={styles.locationLabel}
									>
										Last Known Location
									</Typography>
									<Typography
										variant="h3"
										weight="bold"
										style={styles.locationName}
									>
										{character.location.name}
									</Typography>
									{character.location.type && (
										<Typography
											variant="body"
											weight="medium"
											style={styles.locationType}
										>
											{character.location.type}
										</Typography>
									)}
									{character.location.dimension && (
										<Typography
											variant="caption"
											style={styles.locationDimension}
										>
											{character.location.dimension}
										</Typography>
									)}
								</View>
							)}
						</View>
					</Animated.View>

					{/* Episodes */}
					{character.episode && character.episode.length > 0 && (
						<Animated.View entering={FadeInUp.delay(700)}>
							<Typography
								variant="h2"
								weight="bold"
								style={styles.sectionTitle}
							>
								Episodes ({character.episode.length})
							</Typography>
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								style={styles.episodesScroll}
							>
								{character.episode.slice(0, 10).map((episode, index) => (
									<Animated.View
										key={episode.id}
										entering={SlideInRight.delay(800 + index * 50)}
										style={styles.episodeCard}
									>
										<Typography
											variant="caption"
											weight="bold"
											style={styles.episodeNumber}
										>
											{episode.episode}
										</Typography>
										<Typography
											variant="body"
											weight="medium"
											style={styles.episodeName}
											numberOfLines={2}
										>
											{episode.name}
										</Typography>
										<Typography
											variant="caption"
											style={styles.episodeDate}
										>
											{episode.air_date}
										</Typography>
									</Animated.View>
								))}
								{character.episode.length > 10 && (
									<View style={styles.moreEpisodesCard}>
										<Typography
											variant="body"
											weight="medium"
											style={styles.moreEpisodesText}
										>
											+{character.episode.length - 10} more
										</Typography>
									</View>
								)}
							</ScrollView>
						</Animated.View>
					)}

					{/* Additional Info */}
					{character.type && (
						<Animated.View
							entering={FadeInUp.delay(800)}
							style={styles.additionalInfo}
						>
							<Typography
								variant="h2"
								weight="bold"
								style={styles.sectionTitle}
							>
								Additional Information
							</Typography>
							<View style={styles.infoCard}>
								<Typography
									variant="caption"
									weight="medium"
									style={styles.infoLabel}
								>
									Type
								</Typography>
								<Typography
									variant="h3"
									weight="bold"
									style={styles.infoValue}
								>
									{character.type}
								</Typography>
							</View>
						</Animated.View>
					)}

					{/* Creation Date */}
					{character.created && (
						<Animated.View
							entering={FadeInUp.delay(900)}
							style={styles.createdInfo}
						>
							<Typography
								variant="caption"
								weight="medium"
								style={styles.createdLabel}
							>
								Created
							</Typography>
							<Typography
								variant="body"
								weight="medium"
								style={styles.createdDate}
							>
								{new Date(character.created).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</Typography>
						</Animated.View>
					)}
				</View>
			</ScrollView>
		</View>
	)
}
