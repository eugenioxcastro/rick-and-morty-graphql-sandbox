import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

/**
 * Apollo Client Configuration
 *
 * This setup includes:
 * - Connection to Rick & Morty GraphQL API
 * - Standard in-memory cache for GraphQL responses
 * - Favorites are managed by React Context for simplicity and reliability
 */

export const client = new ApolloClient({
	link: new HttpLink({
		uri: 'https://rickandmortyapi.com/graphql',
	}),
	cache: new InMemoryCache(),
})
