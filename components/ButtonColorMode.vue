<template>
    <ClientOnly v-if="!colorMode?.forced">
        <UButton
            :icon="isDark ? ICONS.moon : ICONS.sun"
            :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
            color="gray"
            variant="ghost"
            @click="isDark = !isDark"
        />

        <template #fallback>
            <div class="w-8 h-8" />
        </template>
    </ClientOnly>
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: false
})
const { ui } = useAppConfig()
const ICONS = {
    moon: ui.icons.dark ?? 'i-heroicons-moon-20-solid',
    sun: ui.icons.light ?? 'i-heroicons-sun-20-solid'
}

const colorMode = useColorMode()

// Computed
const isDark = computed({
    get () {
        return colorMode.value === 'dark'
    },
    set () {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})
</script>
