<template>
    <NuxtLink
        v-if="seo?.siteName"
        to="/"
        class="text-sm inline-flex items-center gap-1"
    >
        <span>{{ seo?.siteName }}</span>
        <span v-if="version">({{ version }})</span>
    </NuxtLink>
</template>

<script setup lang="ts">
import { version } from '~/package.json'

const { seo } = useAppConfig()

console.log(version)
</script>
