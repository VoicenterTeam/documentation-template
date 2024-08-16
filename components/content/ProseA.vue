<template>
    <NuxtLink
        :href="href"
        :target="target"
        class="hover:text-primary-500 dark:hover:text-primary-400"
    >
        <slot />
    </NuxtLink>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
    href: {
        type: String,
        default: ''
    },
    target: {
        type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined>,
        default: undefined,
        required: false
    }
})
</script>
