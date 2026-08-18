import babel from "@rolldown/plugin-babel"
import tailwindcss from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react"
import { nitro } from "nitro/vite"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

const config = defineConfig({
	resolve: { tsconfigPaths: true },

	plugins: [
		devtools({
			enhancedLogs: { enabled: false },
			consolePiping: { enabled: false }
		}),
		nitro(),
		tailwindcss(),
		tanstackStart(),
		svgr(),
		viteReact(),
		babel({ presets: [reactCompilerPreset()] })
	]
})

export default config
