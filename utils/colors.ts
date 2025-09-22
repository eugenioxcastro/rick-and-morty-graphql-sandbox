export const getStatusColor = (status: string) => {
	switch (status) {
		case 'Alive':
			return '#10B981'
		case 'Dead':
			return '#EF4444'
		default:
			return '#6B7280'
	}
}

export const getStatusBgColor = (status: string) => {
	switch (status) {
		case 'Alive':
			return '#DCFCE7'
		case 'Dead':
			return '#FEE2E2'
		default:
			return '#F3F4F6'
	}
}
