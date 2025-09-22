import { gql } from '@apollo/client'

/**
 * GraphQL Query to fetch all characters from Rick and Morty API
 *
 * What this query does:
 * - Fetches the 'characters' field from the API
 * - Gets 'results' array which contains character data
 * - Requests specific fields for each character:
 *   - id: Unique identifier
 *   - name: Character name
 *   - status: Alive, Dead, or unknown
 *   - species: Human, Alien, etc.
 *   - image: URL to character image
 *   - gender: Male, Female, Genderless, or unknown
 *   - origin: Where the character is from
 */
export const GET_CHARACTERS = gql`
	query GetCharacters($page: Int) {
		characters(page: $page) {
			info {
				count
				pages
				next
				prev
			}
			results {
				id
				name
				status
				species
				image
				gender
				origin {
					name
				}
			}
		}
	}
`

/**
 * GraphQL Query to fetch a single character by ID
 * Used for detailed character views
 */
export const GET_CHARACTER = gql`
	query GetCharacter($id: ID!) {
		character(id: $id) {
			id
			name
			status
			species
			type
			gender
			origin {
				id
				name
				type
				dimension
			}
			location {
				id
				name
				type
				dimension
			}
			image
			episode {
				id
				name
				air_date
				episode
			}
			created
		}
	}
`
