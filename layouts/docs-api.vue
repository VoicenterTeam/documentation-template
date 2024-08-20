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
import type { INavigationMapped } from '~/types'

const navigation = inject<Ref<NavItem[]>>('navigation')

const navigationListMapped = computed(() => {
    return mapNavigation(navigation?.value || [])
})

function mapNavigation (navigation: Array<NavItem>) {
    const navDocsItems = navigation.find(i => i._path === '/api')?.children || []
    return mapContentNavigation(navDocsItems, true)
}

function mapContentNavigation (navigation: NavItem[], isRoot = false): Array<INavigationMapped> {
    const navMap = {
        iconRoot: 'i-heroicons-book-open',
        iconFolder: 'i-heroicons-square-3-stack-3d-16-solid',
        iconPage: 'i-heroicons:document-text'
    }

    return navigation.map((navLink) => {
        if (navLink.children) {
            return {
                icon: navMap.iconFolder,
                to: navLink._path,
                label: navLink.title,
                children: mapSecondChildrenGroups(navLink.children)
            }
        }

        return {
            icon: navLink.icon || (isRoot ? navMap.iconRoot : navMap.iconPage),
            to: navLink._path,
            label: navLink.title
        }
    })
}
function mapSecondChildrenGroups (data: Array<NavItem>): Array<INavigationMapped> {
    return data.map((item: NavItem) => {
        if (!item.children) {
            return {
                icon: item.icon || 'i-heroicons:document-text',
                to: item._path,
                label: item.title
            }
        } else {
            return {
                icon: item.icon || 'i-heroicons-square-3-stack-3d-16-solid',
                to: item._path,
                label: item.title,
                children: mapSecondChildrenGroups(item.children)
            }
        }
    })
}
</script>

