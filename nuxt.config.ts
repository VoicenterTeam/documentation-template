// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import fs from 'fs'

export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [ '@nuxt/ui', '@nuxt/content', '@nuxt/image', '@nuxt/fonts', 'nuxt-og-image' ],
    content: {
        //navigation: true,
        highlight: {
            // Theme used in all color schemes.
            theme: 'github-light',
            preload: [ 'ts', 'js', 'css', 'java', 'json', 'bash', 'vue' ]
        }
    },
    tailwindcss: {
        cssPath: [ '~/assets/css/tailwind.css', { injectPosition: 'first' } ],
        configPath: 'tailwind.config',
    },
    hooks: {
        'build:before': () => {
            console.log('NITROOOOOOO')
            const output = path.join(__dirname, 'content')
            const file = 'README.md'
            const src = path.join(__dirname, file)
            const dest = path.join(output, 'index.md')
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
    css: [ '~/assets/css/main.css' ]
})
