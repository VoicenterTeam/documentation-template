---
title: VoicenterTeam Documentation Template
description: Getting started Page description
navigation:
  title: Get Stared
---

# VoicenterTeam Documentation Template

The Template for VoicenterTeam projects documentations.

## Installation

1. Create folder docs and create new nuxt project:
```bash [Terminal]
npx nuxi@3 init docs
```
OR
```bash [Terminal]
cd docs && npx nuxi@3 init .
```
With Template:
```bash [Terminal]
npx nuxi@3 init . -t content   
```

2. Install next dependencies:
```json [package.json]
{
    "dependencies": {
        "@nuxt/content": "^2.13.2",
        "nuxt": "^3.13.0",
        "voicenter-team-documentation-template": "https://github.com/VoicenterTeam/documentation-template.git"
    },
    "devDependencies": {
        "typedoc": "^0.26.6",
        "typedoc-plugin-markdown": "^4.2.5"
    }
}
```

2. Configure your nuxt project by adding the following:
```ts [nuxt.config.ts]
export default defineNuxtConfig({
    extends: [
        [ 'github:VoicenterTeam/documentation-template', { install: true } ]
    ],
    uiTypedoc: {
        /* if need to generate api-docs folder by entryPoints */
        typesGenerate: true, // true | false
        entryPoints: [ resolve(__dirname, '../dist/some-file.d.ts') ]
    },
    css: [
        './assets/css/tailwind.css'
    ],
})
```
To use the Voicenter UI library, you need to add styles above tailwind css (components are added by default):
```ts [nuxt.config.ts]
export default defineNuxtConfig({
    extends: [
        [ 'github:VoicenterTeam/documentation-template', { install: true } ]
    ],
    uiTypedoc: {
        /* if need to generate api-docs folder by entryPoints */
        typesGenerate: true, // true | false
        entryPoints: [ resolve(__dirname, '../dist/some-file.d.ts') ]
    },
    css: [
        '@voicenter-team/voicenter-ui-plus/library/style.css',
        './assets/css/tailwind.css'
    ],
})
```

3. Configure app configs (to change default configs),  Example:
```ts [app.config.ts]
export default defineAppConfig({
    ui: {
        primary: 'red',
        gray: 'slate',
        appLogo: {
            width: '164px',
            height: 'auto',
            maxWidth: '164px'
        },
    },
    seo: {
        siteName: 'VoicenterTeam Documentation',
        siteDescription: 'VoicenterTeam Documentation Site Description',
        docsHeaderTemplate: '%s | VoicenterTeamDocs',
        apiHeaderTemplate: '%s | VoicenterTeamDocs',
        indexHeaderTemplate: 'Project Overview | VoicenterTeamDocs'
    },
    header: {
        version: '',
        showSiteName: true,
        apiLinkName: 'Api',
        exampleLinkName: 'Demo'
    },
})
```
Default Configs:
```ts [app.config.ts]
export default defineAppConfig({
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
            navPrev: 'i-heroicons-arrow-right-20-solid',
            navDocs: 'i-heroicons:book-open',
            navApi: 'i-heroicons:square-3-stack-3d',
            navDemo: 'i-heroicons:computer-desktop'
        }
    },
    seo: {
        siteName: 'Nuxt UI VC Doc',
        siteDescription: 'Nuxt UI VC Doc Template',
        docsHeaderTemplate: '%s | UI VC Doc',
        apiHeaderTemplate: '%s | UI VC Doc',
        indexHeaderTemplate: ''
    },
    header: {
        version: '',
        showSiteName: true,
        apiLinkName: 'Api',
        exampleLinkName: 'Demo'
        // height: '200px'
    }
})
```
4. Remove app.vue file from root folder.
5. Change tailwind.config.ts, if needed. For example, change primary colors (ui.primary: 'red' in app.config.ts):
```ts [tailwind.config.ts]
import type { Config } from 'tailwindcss'
// import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                red: {
                    50: '#ffece9',
                    100: '#ffd9d2',
                    200: '#feb2a6',
                    300: '#f47465',
                    400: '#ef5c4e',
                    500: '#e31515',
                    600: '#c51111',
                    700: '#a80c0c',
                    800: '#8c0808',
                    900: '#710505',
                    950: '#3f0202'
                }
            }
        }
    }
} 
```
6. Check `tailwind.css` file
```css [tailwind.css]
@tailwind base;
@tailwind components;
@tailwind utilities; 
```
7. Run `npm run dev` or `npm run build`

## Usage

After starting project in folder content should be created docs and api-docs folders (api-docs if typesGenerate: true), 
also need to add index.md (can be only one row in this file) and created index page, docs page and api-docs (optional).
If needed to add example (demo) page just add `example.vue` component to `pages` folder.

## Adding or Changing content
Logo: `app-logo.svg` in `public`

FavIcon: `favicon.ico` in `public`

IndexPage `WelcomePageContent.vue` in `components`

### Available components to usage:
- components:
   - [WelcomePageContent.vue]
   - [WelcomePageNavigation.vue]
   - [PageTocList.vue]
   - [PagePrevNext.vue]
   - [PageNavigationLinks.vue]
   - [PageNavigationLink.vue]
   - [PageHeader.vue]
   - [PageBottomNavLink.vue]
   - [ContentTocLinks.vue]
   - [ContentSearch.vue]
   - [ButtonColorMode.vue]
-  components -> layout:
   - [AppAside.vue]
   - [AppFooter.vue]
   - [AppHeader.vue]
   - [AppLogo.vue]
   - [AppSiteName.vue]
   - [AppTopNavigation.vue]
   - [SearchModalContent.vue]