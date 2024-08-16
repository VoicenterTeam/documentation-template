<template>
    <div class="flex flex-col min-h-screen">
        <NuxtLoadingIndicator />
        <AppHeader class="sticky top-0 z-50" />
        <main class="flex-grow min-h-[calc(100vh-var(--header-height))]">
            <slot />
        </main>
        <AppFooter />
    </div>
</template>

<script lang="ts" setup>
import AppHeader from '~/components/main/layout/AppHeader.vue'
import AppFooter from '~/components/main/layout/AppFooter.vue'

// const mapContentNavigation = (data) => {
//     console.log({ data })
// }
</script>

