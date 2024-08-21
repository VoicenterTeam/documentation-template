<template>
    <div class="flex flex-col min-h-screen">
        <LayoutAppHeader class="sticky top-0 z-50" />
        <main class="flex-grow min-h-[calc(100vh-var(--header-height))]">
            <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-4">
                    <div class="lg:col-span-3 lg:max-h-[calc(100vh-var(--header-height))] relative lg:sticky lg:top-[var(--header-height)] overflow-y-auto -mx-3 px-3 overflow-x-hidden">
                        <LayoutAppAside
                            :navigation="navigationListMapped"
                            class="py-8"
                        />
                    </div>
                    <div class="lg:col-span-9">
                        <slot />
                    </div>
                </div>
            </div>
        </main>
        <LayoutAppFooter />
    </div>
</template>

<script lang="ts" setup>
import type { NavItem } from '@nuxt/content'
import { useNavigationMappedData } from '~/composables/useNavigationData'

const navigation = inject<Ref<NavItem[]>>('navigation')

const { navigationListMapped } = useNavigationMappedData(navigation, '/api')
</script>

