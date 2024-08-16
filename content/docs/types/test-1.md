---
title: 'Title of the page'
description: 'meta description of the page'
icon: 'i-heroicons-sun-20-solid'
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/nuxt/ui/blob/dev/src/runtime/components/elements/Button.vue
---

# Nuxt UI Minimal Starter

Look at [Nuxt docs](https://nuxt.com/docs/getting-started/introduction) and [Nuxt UI docs](https://ui.nuxt.com) to learn more.

## Setup

### Setup Test

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```ts [/server/api/parse-mdc.ts]
import { parseMarkdown } from '@nuxtjs/mdc/runtime'

export default eventHandler(async () => {
  const mdc = [
    '# Hello MDC',
    '',
    '::alert',
    'This is an Alert',
    '::'
  ].join('\n')

  const ast = await parseMarkdown(mdc)

  return ast
})
```

#### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
