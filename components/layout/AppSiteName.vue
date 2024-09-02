<template>
    <ClientOnly>
        <NuxtLink
            v-if="seo?.siteName"
            to="/"
            class="text-sm items-center gap-1 hidden sm:inline-flex"
        >
            <span v-if="header?.showSiteName">{{ seo?.siteName }}</span>
            <span v-if="header.version">({{ header.version }})</span>
        </NuxtLink>
    </ClientOnly>
</template>

<script setup lang="ts">
const { seo, header } = useAppConfig()
</script>
