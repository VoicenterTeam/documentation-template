<template>
    <div>
        <NuxtLink to="/">
            <img
                :style="logoSize"
                src="/app-logo.svg"
                alt="logo-img"
                class="max-h-full object-contain"
            >
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const { ui } = useAppConfig()

const logoSize = computed(() => {
    return {
        width: ui?.appLogo?.width || '100%',
        height: ui?.appLogo?.height || 'auto',
        maxWidth: ui?.appLogo?.maxWidth || '132px'
    }
})
</script>

