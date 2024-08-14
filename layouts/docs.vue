<template>
    <div class="flex flex-col min-h-screen">
        <NuxtLoadingIndicator />
        <AppHeader />
        <main class="flex-grow min-h-[calc(100vh-var(--header-height))]">
            <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8">
                    <div class="lg:col-span-3 lg:max-h-[calc(100vh-var(--header-height))] sticky overflow-y-auto top-[var(--header-height)] py-8">
                        <AppAside />
                    </div>
                    <div class="lg:col-span-9 min-h-[calc(100vh-var(--header-height))] py-8 px-3">
                        <slot />
                    </div>
                </div>
            </div>
        </main>
        <AppFooter />
    </div>
</template>

<script lang="ts" setup>
import AppHeader from '~/components/main/layout/AppHeader.vue'
import AppFooter from '~/components/main/layout/AppFooter.vue'
import AppAside from '~/components/main/layout/AppAside.vue'

// const mapContentNavigation = (data) => {
//     console.log({ data })
// }
</script>

