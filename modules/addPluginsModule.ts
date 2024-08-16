import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
    setup (options, nuxt) {
        // Add modules you want to include
        nuxt.options.modules.push('@nuxt/content', '@nuxt/ui', '@nuxt/image')
    }
})
