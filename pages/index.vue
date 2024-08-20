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
</script>
