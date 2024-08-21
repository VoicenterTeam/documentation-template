export default defineAppConfig({
    myLayer: {
        name: 'Hello from Nuxt layer'
    },
    ui: {
        primary: 'red',
        gray: 'cool',
        appLogo: {
            width: '100%',
            height: 'auto',
            maxWidth: '132px'
        },
        icons: {
            dark: 'i-heroicons-moon-20-solid',
            light: 'i-heroicons-sun-20-solid',
            system: 'i-heroicons-computer-desktop-20-solid',
            search: 'i-heroicons-magnifying-glass-20-solid',
            external: 'i-heroicons-arrow-up-right-20-solid',
            chevron: 'i-heroicons-chevron-down-20-solid',
            hash: 'i-heroicons-hashtag-20-solid',
            menu: 'i-heroicons-bars-3-20-solid',
            close: 'i-heroicons-x-mark-20-solid',
            check: 'i-heroicons-check-circle-20-solid',
            navRoot: 'i-heroicons-book-open',
            navFolder: 'i-heroicons-square-3-stack-3d-16-solid',
            navPage: 'i-heroicons:document-text',
            navNext: 'i-heroicons-arrow-left-20-solid',
            navPrev: 'i-heroicons-arrow-right-20-solid'
        }
    },
    seo: {
        siteName: 'Nuxt UI VC Doc'
    },
    header: {
        // height: '200px'
    }
    // footer: {
    //
    // }
})

declare module '@nuxt/schema' {
    interface AppConfigInput {
        myLayer?: {
            /** Project name */
            name?: string
        }
    }
}
