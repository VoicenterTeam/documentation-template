<template>
    <div class="w-full h-full dark:bg-gradient-to-b from-gray-950 to-gray-900 pt-[var(--header-height)]">
        <WelcomePageContent />
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout: 'welcome'
})


const { seo } = useAppConfig()

useHead({
    title: seo.siteName
})
</script>

<style>

</style>
