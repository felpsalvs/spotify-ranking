import dotenv from 'dotenv';
import cors from "cors"
import express from "express"
import axios from "axios"

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

app.post("/api/sendData", async (req, res) => {
	try {
		const response = await axios.post(
			"https://psel-solution-automation-cf-ubqz773kaq-uc.a.run.app/?access_token=bC2lWA5c7mt1rSPR",
			req.body,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		res.json(response.data)
	} catch (error) {
		console.error("Erro ao enviar os dados:", error.message)
		res.status(500).json({ error: "Erro ao enviar os dados" })
	}
})

app.post("/api/token", async (req, res) => {
	try {
		const response = await axios.post(
			"https://accounts.spotify.com/api/token",
			new URLSearchParams({
				grant_type: "client_credentials",
			}).toString(),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization:
						"Basic " +
						Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
				},
			}
		)

		res.json(response.data)
	} catch (error) {
		console.error("Error fetching token:", error.message)
		res.status(500).json({ error: "Failed to retrieve token" })
	}
})
app.get("/api/artists", async (req, res) => {
	const { ids } = req.query
	try {
		console.log("IDs dos artistas:", ids)

		const tokenResponse = await axios.post(
			"https://accounts.spotify.com/api/token",
			new URLSearchParams({
				grant_type: "client_credentials",
			}).toString(),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization:
						"Basic " +
						Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
				},
			}
		)
		
		const accessToken = tokenResponse.data.access_token
		console.log("Access Token:", accessToken)

		const response = await axios.get("https://api.spotify.com/v1/artists", {
			params: { ids },
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		console.log("Dados dos artistas:", response.data)
		res.json(response.data.artists)
	} catch (error) {
		console.error("Error fetching artist data:", error.message)
		res.status(500).json({ error: "Failed to retrieve artist data" })
	}
})

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
