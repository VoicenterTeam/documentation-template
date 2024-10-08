// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDirLocal = dirname(fileURLToPath(import.meta.url))
// const currentDirProcess = process.cwd()

export default defineNuxtConfig({
    devtools: { enabled: true },
    ssr: false,
    modules: [
        '@nuxt/content',
        '@nuxt/ui',
        // '@nuxt/image', /*'@nuxt/fonts', 'nuxt-og-image',*/
        './modules/addPluginsModule.ts',
        './modules/typedocGenerate.ts'
    ],
    ui: {
        disableGlobalStyles: true
    },
    content: {
        // navigation: false,
        documentDriven: {
            page: true,
            surround: true
        },
        experimental: {
            clientDB: true,
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
            fields: [ 'icon', 'to', 'target', 'title' ]
        }
    },
    hooks: {
        // 'build:before': () => {
        //     const output = join(currentDirProcess, 'content/docs')
        //     if (!fs.existsSync(output)) {
        //         fs.mkdirSync(output, { recursive: true })
        //     }
        //     const file = 'README.md'
        //     const src = join(currentDirProcess, file)
        //     const dest = join(output, '1.get-started.md')
        //     fs.copyFileSync(src, dest)
        // },
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
        '/api-docs': {
            redirect: '/api-docs/global',
            prerender: false
        },
    },
    uiTypedoc: {
        // typesGenerate: true,
        // entryPoints: [ join(currentDirProcess, 'test/index.ts') ]
    },
    // components: {
    //     global: true,
    // },
    css: [
        join(currentDirLocal, 'assets/css/main.css'),
        join(currentDirLocal, 'assets/css/tailwind.css')
    ]
})
