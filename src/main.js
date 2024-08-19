import "./css/style.css"
import { getArtistsData } from "./js/api.js"
import { createPopRanking, createGenreRanking } from "./js/rankings.js"
import { displayPopRanking, displayGenreRanking } from "./js/ui.js"

const ARTIST_IDS = [
	"6eUKZXaKkcviH0Ku9w2n3V",
	"1dfeR4HaWDbWqFHLkxsg1d",
	"66CXWjxzNUsdJxJ2JdwvnR",
	"04gDigrS5kc9YWfZHwBETP",
	"53XhwfbYqKCa1cC15pYq2q",
	"7dGJo4pcD2V6oG8kP0tJRR",
	"1HY2Jd0NmPuamShAr6KMms",
	"4gzpq5DPGxSnKTe4SA8HAU",
	"6vWDO969PvNqNYHIOW5v0m",
	"0du5cEVh5yTK9QJze8zA0C",
	"5pKCCKE2ajJHZ9KAiaK11H",
	"0EmeFodog0BfCgMzAIvKQp",
	"1uNFoZAHBGtllmzznpCI3s",
	"6S2OmqARrzebs0tKUEyXyp",
	"06HL4z0CvFAxyc27GXpf02",
]

async function init() {
	try {
		console.log("Iniciando aplicação...")
		const artists = await getArtistsData(ARTIST_IDS)
		console.log("Artistas obtidos:", artists.length)
		const popRanking = createPopRanking(artists)
		const genreRanking = createGenreRanking(artists)

		displayPopRanking(popRanking)
		displayGenreRanking(genreRanking)

		await sendDataToEndpoint(popRanking, genreRanking)
	} catch (error) {
		console.error("Erro ao inicializar a aplicação:", error)
		document.body.innerHTML += `<p style="color: red;">Erro ao carregar dados. Por favor, verifique o console e tente novamente mais tarde.</p>`
	}
}

async function sendDataToEndpoint(popRanking, genreRanking) {
	const data = {
		github_url: "https://github.com/seu-username/seu-repositorio",
		name: "Seu Nome",
		pop_ranking: popRanking,
		genre_ranking: genreRanking,
	}

	try {
		const response = await fetch(
			"https://psel-solution-automation-cf-ubqz773kaq-uc.a.run.app?access_token=bC2lWA5c7mt1rSPR",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		)

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		console.log("Dados enviados com sucesso!")
	} catch (error) {
		console.error("Erro ao enviar dados:", error)
		throw error
	}
}

init()
