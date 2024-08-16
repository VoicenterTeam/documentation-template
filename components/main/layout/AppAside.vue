<template>
    <aside class="app-aside-block">
        <div class="relative">
            <!--            <client-only>
                <input v-model="searchString" @input="search">
                <pre>{{ results || [] }}</pre>
            </client-only>-->
            <div>
                <div class="flex flex-col gap-3 mb-3 general-list">
                    <div
                        v-for="(genItem, index) in navigationListMapped.general"
                        :key="`general-${index}`"
                        class="flex items-center gap-2"
                    >
                        <NuxtLink
                            class="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                            :to="genItem.to"
                        >
                            <div class="nav-icon-block">
                                <UIcon
                                    :name="genItem.icon"
                                    class="nav-icon"
                                />
                            </div>
                            {{ genItem.label }}
                        </NuxtLink>
                    </div>
                </div>
                <div class="flex flex-col gap-3 groups-list">
                    <div
                        v-for="(groupItem, grIndex) in navigationListMapped.groups"
                        :key="`group-${grIndex}`"
                        class="group-block"
                    >
                        <div class="flex items-center gap-2">
                            <div class="nav-icon-block">
                                <UIcon
                                    :name="groupItem.icon"
                                    class="nav-icon"
                                />
                            </div>
                            {{ groupItem.label }}
                        </div>
                        <div class="pl-2 pt-3">
                            <UVerticalNavigation
                                :links="groupItem.children"
                                :ui="{
                                    wrapper: 'border-s border-gray-200 dark:border-gray-800 text-lg space-y-2',
                                    base: 'group block border-s -ms-px leading-6 before:hidden',
                                    padding: 'py-0.5 ps-4',
                                    rounded: '',
                                    font: '',
                                    ring: '',
                                    size: 'text-base',
                                    icon: {
                                        base: 'flex-shrink-0 w-5 h-5 relative',
                                        active: 'text-primary-500 dark:text-primary-400',
                                        inactive: 'text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200',
                                    },
                                    active: 'flex items-center text-primary-500 dark:text-primary-400 border-current font-semibold active-link',
                                    inactive: 'flex items-center border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
                                }"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { NavItem } from '@nuxt/content'
import type { INavigationMapped } from '~/types'

interface INavigationData {
    general: Array<INavigationMapped>
    groups: Array<INavigationMapped>
}


const navigation = inject<Ref<NavItem[]>>('navigation')
console.log({ navigation })
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
    return navigation.reduce((acc, item) => {
        if (item._path === '/docs' && item.children) {
            item.children.forEach(child => {
                if (!child.children) {
                    acc.general.push({
                        icon: 'i-heroicons-book-open',
                        to: child._path,
                        label: child.title
                    })
                } else {
                    acc.groups.push({
                        children: getChildrenGroups(child),
                        icon: 'i-heroicons-square-3-stack-3d-16-solid',
                        to: child._path,
                        label: child.title
                    })
                }
            })
        }
        return acc
    }, {
        general: [],
        groups: []
    } as INavigationData)
}
function getChildrenGroups (data: NavItem, initial: Array<INavigationMapped> = []): Array<INavigationMapped>  {
    if (!data.children) {
        return []
    }
    return data.children?.reduce((acc, item) => {
        if (!item.children) {
            acc.push({
                icon: 'i-heroicons:document-text',
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
    .groups-list {
        .nav-icon-block {
            @apply rounded-md p-1 inline-flex ring-inset ring-1 bg-gray-100/50 dark:bg-gray-800/50 ring-gray-300 dark:ring-gray-700
        }
        .group-block:has(a.active-link) {
            .nav-icon-block {
                @apply text-primary-500 dark:text-primary-400;
            }
        }
    }
}
</style>
