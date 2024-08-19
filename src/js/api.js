import axios from "axios"

const SPOTIFY_API_URL = "https://api.spotify.com/v1"
const TOKEN_URL = "https://accounts.spotify.com/api/token"
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET

let accessToken = null
let tokenExpirationTime = 0

async function getAccessToken() {
	const currentTime = Date.now()
	if (accessToken && currentTime < tokenExpirationTime) {
		return accessToken
	}

	console.log("Solicitando novo token de acesso...")
	console.log("CLIENT_ID:", CLIENT_ID)
	console.log("CLIENT_SECRET:", CLIENT_SECRET ? "[PRESENTE]" : "[AUSENTE]")

	try {
		const authOptions = {
			url: TOKEN_URL,
			headers: {
				Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
				"Content-Type": "application/x-www-form-urlencoded",
			},
			data: new URLSearchParams({
				grant_type: "client_credentials",
			}).toString(),
		}

		const response = await axios.post(authOptions.url, authOptions.data, {
			headers: authOptions.headers,
		})

		accessToken = response.data.access_token
		tokenExpirationTime = currentTime + response.data.expires_in * 1000
		console.log("Novo token obtido com sucesso")
		return accessToken
	} catch (error) {
		console.error(
			"Erro ao obter token de acesso:",
			error.response ? error.response.data : error.message
		)
		throw error
	}
}

export async function getArtistsData(artistIds) {
	try {
		const token = await getAccessToken()
		console.log("Fazendo requisição para obter dados dos artistas...")
		const response = await axios.get(`${SPOTIFY_API_URL}/artists`, {
			params: { ids: artistIds.join(",") },
			headers: { Authorization: `Bearer ${token}` },
		})
		console.log("Dados dos artistas obtidos com sucesso")
		return response.data.artists
	} catch (error) {
		if (error.response && error.response.status === 401) {
			console.log("Token expirado, tentando novamente...")
			accessToken = null
			tokenExpirationTime = 0
			return getArtistsData(artistIds)
		}
		console.error(
			"Erro ao obter dados dos artistas:",
			error.response ? error.response.data : error.message
		)
		throw error
	}
}
