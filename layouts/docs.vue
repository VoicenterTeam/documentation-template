<template>
    <div class="flex flex-col min-h-screen">
        <NuxtLoadingIndicator />
        <LayoutAppHeader class="sticky top-0 z-50" />
        <main class="flex-grow min-h-[calc(100vh-var(--header-height))]">
            <slot />
        </main>
        <LayoutAppFooter />
    </div>
</template>

<script lang="ts" setup>

// const mapContentNavigation = (data) => {
//     console.log({ data })
// }
</script>

