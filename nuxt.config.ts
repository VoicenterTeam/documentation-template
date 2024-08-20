// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDirProcess = process.cwd()
const currentDirLocal = dirname(fileURLToPath(import.meta.url))

/* console.log({ currentDirProcess, currentDirLocal }) */

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxt/content',
        '@nuxt/ui',
        '@nuxt/image', /*'@nuxt/fonts', 'nuxt-og-image',*/
        './modules/addPluginsModule.ts',
        './modules/typedocGenerate.ts'
    ],
    content: {
        //navigation: true,
        documentDriven: true,
        experimental: {
            search: {
                ignoredTags: [ 'style', 'code' ]
            },
        },
        highlight: {
            // Theme used in all color schemes.
            theme: {
                default: 'material-theme',
                light: 'material-theme-lighter',
                dark: 'material-theme-palenight'
            },
            preload: [ 'json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini' ]
        },
        navigation: {
            fields: [ 'icon', 'to', 'target' ]
        }
    },
    hooks: {
        'build:before': () => {
            const output = join(currentDirProcess, 'content/docs')
            if (!fs.existsSync(output)) {
                fs.mkdirSync(output, { recursive: true })
            }
            const file = 'README.md'
            const src = join(currentDirProcess, file)
            const dest = join(output, '1.get-started.md')
            fs.copyFileSync(src, dest)
        },
        // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
        'components:extend': (components) => {
            const globals = components.filter(c => [
                'UButton', 'UIcon', 'Card'
            ].includes(c.pascalName))

            globals.forEach(c => c.global = true)
        }
    },
    routeRules: {
        '/docs': {
            redirect: '/docs/get-started',
            prerender: false
        },
        '/api': {
            redirect: '/api/global',
            prerender: false
        },
    },
    uiTypedoc: {
        typesGenerate: true,
    //     outContent: join(currentDirProcess, 'content/api'),
    //     entryPoints: [ join(currentDirProcess, 'test/index.ts') ]
    },
    // components: {
    //     global: true,
    // },
    css: [
        join(currentDirLocal, 'assets/css/main.css'),
        join(currentDirLocal, 'assets/css/tailwind.css')
    ]
})
