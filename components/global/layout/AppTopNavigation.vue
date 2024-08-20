<template>
    <div class="top-navigation hidden lg:flex lg:flex-1 items-center">
        <ul class="items-center gap-x-8 flex">
            <li
                v-for="nav in navigationList"
                :key="nav.link"
                class="relative"
            >
                <NuxtLink
                    :to="nav.link"
                    :class="{'text-primary': $route.path?.startsWith(nav.link)}"
                    class="text-sm/6 font-semibold flex items-center gap-1 hover:text-primary"
                >
                    {{ nav.title }}
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

const navigationList = computed(() => {
    const baseLinks = [
        {
            title: 'Documentation',
            link: '/docs'
        }
    ]
    const apiData = navigation?.value.find(i => i._path === '/api')
    if (apiData) {
        baseLinks.push({
            title: 'Api',
            link: '/api'
        })
    }
    if (routes.find(i => i.name === 'example')) {
        baseLinks.push({
            title: 'Demo',
            link: '/example'
        })
    }

    return baseLinks
})
</script>

