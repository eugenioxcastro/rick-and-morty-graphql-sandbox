// Types for the Rick and Morty API
// All typoes can be found in the official documentation
// https://rickandmortyapi.com/documentation

// Basic info structure used for pagination
export interface Info {
	count: number // Total number of characters
	pages: number // Total number of pages
	next: number | null // Next page number (null if last page)
	prev: number | null // Previous page number (null if first page)
}

// Location/Origin structure
export interface Location {
	id: string
	name: string
	type?: string
	dimension?: string
}

// Episode structure
export interface Episode {
	id: string
	name: string
	air_date: string
	episode: string // Episode code like "S01E01"
}

// Main Character interface
export interface Character {
	id: string
	name: string
	status: 'Alive' | 'Dead' | 'unknown' // Only these 3 values are possible
	species: string // Human, Alien, etc.
	type?: string // Optional - subspecies info
	gender: 'Male' | 'Female' | 'Genderless' | 'unknown'
	origin: Location
	location?: Location
	image: string // URL to character image
	episode?: Episode[] // Array of episodes this character appears in
	created?: string // Creation date
}

// Response structure for the characters query
export interface CharactersResponse {
	characters: {
		info: Info
		results: Character[]
	}
}

// Response structure for single character query
export interface CharacterResponse {
	character: Character
}

// Variables for the GET_CHARACTERS query
export interface GetCharactersVariables {
	page?: number
}

// Variables for the GET_CHARACTER query
export interface GetCharacterVariables {
	id: string
}
