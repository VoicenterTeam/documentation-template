<template>
    <div class="w-full h-full">
        <WelcomePageContent />
    </div>
</template>

<script setup lang="ts">

const { seo } = useAppConfig()
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

useHead({
    title: seo.siteName
})

useSeoMeta({
    titleTemplate: '',
    title: page.value?.title || seo.siteName,
    ogTitle: page.value?.title || seo.siteName,
    description: page.value?.description,
    ogDescription: page.value?.description
})
</script>
