<template>
    <div class="flex flex-col min-h-screen">
        <NuxtLoadingIndicator />
        <LayoutAppHeader class="fixed top-0 z-50 left-0 right-0" />
        <main class="flex-grow min-h-screen">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
</script>

