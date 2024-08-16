<template>
    <ul
        v-if="links?.length"
        :class="config.wrapper"
    >
        <li
            v-for="link in links"
            :key="link.text"
            :class="[config.wrapper, link.depth === 3 && config.depth]"
        >
            <a
                :href="`#${link.id}`"
                :class="[config.base, activeHeadings.includes(link.id) ? config.active : config.inactive]"
                @click.prevent="scrollToHeading(link.id)"
            >
                {{ link.text }}
            </a>

            <ContentTocLinks
                v-if="link.children"
                :links="link.children"
            />
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { TocLink } from '@nuxt/content'
import { useScrollComposable } from '~/composables/useScrollComposable'

const config = {
    wrapper: 'space-y-1 pl-2',
    base: 'block text-sm/6 truncate',
    active: 'text-primary',
    inactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
    depth: 'ml-2'
}

defineOptions({
    inheritAttrs: false
})
const props = defineProps({
    links: {
        type: Array as PropType<TocLink[]>,
        default: () => []
    }
})

const emit = defineEmits([ 'move' ])

const router = useRouter()
const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollComposable()

nuxtApp.hooks.hookOnce('page:finish', () => {
    updateHeadings([
        ...document.querySelectorAll('h2'),
        ...document.querySelectorAll('h3')
    ])
})

const scrollToHeading = (id: string) => {
    const encodedId = encodeURIComponent(id)
    router.push(`#${encodedId}`)
    emit('move', id)
}
</script>

