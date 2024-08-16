<template>
    <h1
        :id="id"
        class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight"
    >
        <slot />
    </h1>
</template>

<script setup lang="ts">
defineProps({
    id: {
        type: String,
        required: true
    }
})
</script>
