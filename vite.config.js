import { defineConfig } from "vite"

export default defineConfig({
	server: {
		open: true,
	},
	define: {
		"process.env": {},
	},
	root: "src",
	build: {
		outDir: "../dist",
	},
})
