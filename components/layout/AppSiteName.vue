<template>
    <ClientOnly>
        <NuxtLink
            v-if="seo?.siteName"
            to="/public"
            class="text-sm inline-flex items-center gap-1"
        >
            <span>{{ seo?.siteName }}</span>
            <span v-if="siteVersion">({{ siteVersion }})</span>
        </NuxtLink>
    </ClientOnly>
</template>

<script setup lang="ts">
import { version } from '~/package.json'

const { seo } = useAppConfig()
const siteVersion = version
</script>
