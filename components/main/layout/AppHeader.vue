<template>
    <header class="bg-background/75 backdrop-blur border-b -mb-px border-gray-200 dark:border-gray-800">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]">
            <div class="flex items-center gap-4">
                <AppLogo />
                <AppSiteName />
            </div>
            <div />
            <div>
                <AppColorModeButton />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import AppColorModeButton from '~/components/main/button/AppColorModeButton.vue'
import AppLogo from '~/components/main/layout/AppLogo.vue'
import AppSiteName from '~/components/main/layout/AppSiteName.vue'
</script>

