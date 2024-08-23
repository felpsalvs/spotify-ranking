export function createPopRanking(artists) {
	return artists
	.sort((a, b) => b.followers.total - a.followers.total)
	.map(artist => ({
			artist_name: artist.name,
			followers: artist.followers.total,
			popularity: artist.popularity,
	}));
}

export function createGenreRanking(artists) {
	const genreCounts = {}
	artists.forEach(artist => {
		artist.genres.forEach(genre => {
			genreCounts[genre] = (genreCounts[genre] || 0) + 1
		})
	})
	return Object.entries(genreCounts)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map(([genre]) => genre)
}
