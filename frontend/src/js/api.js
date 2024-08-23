export async function getArtistsData(artistIds) {
	try {
		const response = await fetch(
			`http://localhost:3000/api/artists?ids=${artistIds.join(",")}`
		)
		if (!response.ok) {
			throw new Error("Erro ao obter dados dos artistas")
		}
		return await response.json()
	} catch (error) {
		console.error("Erro ao obter dados dos artistas:", error.message)
		throw error
	}
}

export function sendDataToEndpoint(popRanking, genreRanking) {
	const payload = {
		github_url: "https://github.com/felpsalvs/spotify-ranking",
		name: "Felipe Alves",
		pop_ranking: popRanking,
		genre_ranking: genreRanking,
	}

	fetch("http://localhost:3000/api/sendData", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	})
		.then(response => {
			if (!response.ok) {
				throw new Error("Erro ao enviar os dados")
			}
			return response.json()
		})
		.then(data => console.log("Dados enviados com sucesso:", data))
		.catch(error => console.error("Erro ao enviar os dados:", error))
}
