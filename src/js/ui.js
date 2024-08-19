export function displayPopRanking(popRanking) {
	const popList = document.getElementById("popList")
	popList.innerHTML = popRanking
		.map(
			artist => `
    <li>
      <span class="artist-name">${artist.artist_name}</span>
      <span class="artist-followers">${artist.followers.toLocaleString()} seguidores</span>
    </li>
  `
		)
		.join("")
}

export function displayGenreRanking(genreRanking) {
	const genreList = document.getElementById("genreList")
	genreList.innerHTML = genreRanking
		.map(
			genre => `
    <li>
      <span class="genre">${genre}</span>
    </li>
  `
		)
		.join("")
}
