<template>
    <header class="bg-background/75 backdrop-blur border-b -mb-px border-gray-200 dark:border-gray-800">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]">
            <div class="flex items-center gap-4 lg:flex-1">
                <LayoutAppLogo />
                <LayoutAppSiteName />
            </div>
            <LayoutAppTopNavigation />
            <div class="flex justify-end items-center lg:flex-1 gap-1">
                <ClientOnly>
                    <ContentSearch />
                </ClientOnly>
                <ButtonColorMode />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">


</script>

