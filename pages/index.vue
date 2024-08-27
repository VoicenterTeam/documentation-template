<template>
    <div class="w-full h-full">
        <WelcomePageContent />
    </div>
</template>

<script setup lang="ts">

const { seo } = useAppConfig()

useHead({
    title: seo.siteName
})

useSeoMeta({
    titleTemplate: seo.indexHeaderTemplate ?? '',
    title: seo.siteName,
    ogTitle: seo.siteName,
    description: seo.siteDescription,
    ogDescription: seo.siteDescription
})
</script>
