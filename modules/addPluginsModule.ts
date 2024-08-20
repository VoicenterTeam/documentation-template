import { defineNuxtModule, installModule } from '@nuxt/kit'

export default defineNuxtModule({
    async setup (options, nuxt) {
        // Add modules you want to include
        const pluginsRequired = [ '@nuxt/content', '@nuxt/ui', '@nuxt/image' ]

        nuxt.options.modules = [ ...new Set([ ...nuxt.options.modules, ...pluginsRequired ]) ]

        await installModule('@nuxt/content')
        await installModule('@nuxt/ui')
        await installModule('@nuxt/image')
    }
})
