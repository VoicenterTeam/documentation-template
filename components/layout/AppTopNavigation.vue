<template>
    <div class="top-navigation flex-1 items-center">
        <ul class="items-center gap-x-2 md:gap-x-8 flex justify-end md:justify-center">
            <li
                v-for="nav in navigationList"
                :key="nav.link"
                class="relative"
            >
                <NuxtLink
                    :to="nav.link"
                    :class="{'text-primary': $route.path?.startsWith(nav.link)}"
                    class="text-sm/6 font-semibold flex items-center group"
                >
                    <div class="rounded-md p-1.5 inline-flex md:hidden ring-inset ring-1 bg-gray-100/50 dark:bg-gray-800/50 ring-gray-300 dark:ring-gray-700 group-hover:bg-primary group-hover:text-white group-hover:ring-primary group-hover:text-background">
                        <UIcon
                            :name="nav.icon"
                            class="size-5"
                        />
                    </div>
                    <span class="hidden md:inline-flex group-hover:text-primary">
                        {{ nav.title }}
                    </span>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { NavItem } from '@nuxt/content'

const navigation = inject<Ref<NavItem[]>>('navigation')

const routes = useRouter().options.routes
const { ui } = useAppConfig()

const navigationList = computed(() => {
    const baseLinks = [
        {
            title: 'Documentation',
            link: '/docs',
            icon: ui.icons.navDocs ?? 'i-heroicons:book-open'
        }
    ]
    const apiData = navigation?.value.find(i => i._path === '/api-docs')
    if (apiData) {
        baseLinks.push({
            title: 'Api',
            link: '/api-docs',
            icon: ui.icons.navApi ?? 'i-heroicons:square-3-stack-3d'
        })
    }
    if (routes.find(i => i.name === 'example')) {
        baseLinks.push({
            title: 'Demo',
            link: '/example',
            icon: ui.icons.navDemo ?? 'i-heroicons:computer-desktop'
        })
    }

    return baseLinks
})
</script>

