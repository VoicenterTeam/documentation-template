<template>
    <div class="flex flex-col min-h-screen">
        <LayoutAppHeader class="fixed top-0 z-50 left-0 right-0" />
        <main class="flex-grow min-h-screen pt-[var(--header-height)] dark:bg-gradient-to-b from-gray-950 to-gray-900">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
</script>

