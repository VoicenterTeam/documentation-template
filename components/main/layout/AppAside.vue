<template>
    <aside class="app-aside-block">
        <div class="relative">
            <!--            <client-only>
                <input v-model="searchString" @input="search">
                <pre>{{ results || [] }}</pre>
            </client-only>-->
            <div>
                <div class="flex flex-col gap-3 mb-3 general-list">
                    <template
                        v-for="(navItem, i) in navigationListMapped"
                        :key="`${navItem.to || `nav-${i}`}`"
                    >
                        <PageNavigationLinks :link="navItem" />
                    </template>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { NavItem } from '@nuxt/content'
import type { INavigationMapped } from '~/types'
import PageNavigationLinks from '~/components/main/PageNavigationLinks.vue'

const navigation = inject<Ref<NavItem[]>>('navigation')
// console.log({ navigation })
const navigationListMapped = computed(() => {
    return mapNavigation(navigation?.value || [])
})
// const searchString = ref('')
// const results = ref([])
// const searching = ref(false)
//
// const search = async () => {
//     searching.value = true
//     const res = await searchContent(searchString.value, {})
//     results.value = res.value // res is a computed so we pluck out the .value and just add it to our ref
//     searching.value = false
// }

function mapNavigation (navigation: Array<NavItem>) {
    const navItems = navigation.find(i => i._path === '/docs')?.children || []
    return mapContentNavigation(navItems, true)
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
                children: getChildrenGroups(navLink, [])
            }
        }

        return {
            icon: navLink.icon || (isRoot ? navMap.iconRoot : navMap.iconPage),
            to: navLink._path,
            label: navLink.title
        }
    })
}
function getChildrenGroups (data: NavItem, initial: Array<INavigationMapped> = []): Array<INavigationMapped>  {
    if (!data.children) {
        return []
    }
    return data.children?.reduce((acc, item) => {
        if (!item.children) {
            acc.push({
                icon: item.icon || 'i-heroicons:document-text',
                to: item._path,
                label: item.title
            })
        } else {
            return getChildrenGroups(item, acc)

        }
        return acc
    }, initial)
}
</script>

<style lang="scss">
.app-aside-block {
    .general-list {
        .nav-icon-block {
            @apply rounded-md p-1 inline-flex ring-inset ring-1 bg-gray-100/50 dark:bg-gray-800/50 ring-gray-300 dark:ring-gray-700;
        }
        .router-link-active {
            @apply text-primary-500 dark:text-primary-400;
            .nav-icon-block {
                @apply text-primary-500 dark:text-primary-400;
            }
        }
    }
    .group-block:has(a.active-link) {
        .nav-icon-block {
            @apply text-primary-500 dark:text-primary-400;
        }
    }
}
</style>
