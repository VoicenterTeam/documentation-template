<template>
    <header class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]">
            <div>
                <NuxtLink to="/">
                    <AppLogo />
                </NuxtLink>
            </div>
            <div>
                Some Navs
            </div>
            <div>
                <AppColorModeButton />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import AppColorModeButton from '~/components/main/button/AppColorModeButton.vue'
import AppLogo from '~/components/main/layout/AppLogo.vue'
</script>

