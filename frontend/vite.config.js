import { defineConfig } from "vite"

export default defineConfig({
	server: {
		open: true,
		proxy: {
			"/api": {
				target: "https://psel-solution-automation-cf-ubqz773kaq-uc.a.run.app",
				changeOrigin: true,
				secure: false,
				rewrite: path => path.replace(/^\/api/, ""),
			},
		},
	},
	define: {
		"process.env": {},
	},
	root: "src",
	build: {
		outDir: "../dist",
	},
})
