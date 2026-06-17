import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import svgr from "vite-plugin-svgr"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact, { reactCompilerPreset } from "@vitejs/plugin-react"
import babel from "@rolldown/plugin-babel"
import tailwindcss from "@tailwindcss/vite"
import { nitro } from "nitro/vite"

const config = defineConfig({
	resolve: { tsconfigPaths: true },

	plugins: [
		devtools({
			enhancedLogs: { enabled: false },
			consolePiping: { enabled: false }
		}),
		nitro({ rollupConfig: { external: [/^@sentry\//] } }),
		tailwindcss(),
		tanstackStart(),
		svgr(),
		viteReact(),
		babel({ presets: [reactCompilerPreset()] })
	]
})

export default config
