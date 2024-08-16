<template>
    <nav class="page-toc-list backdrop-blur py-8">
        <div :class="config.container.base">
            <div class="font-semibold text-sm truncate">
                {{ listTitle }}
            </div>
            <ContentTocLinks
                :links="links"
            />
        </div>
    </nav>
</template>

<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

defineOptions({
    inheritAttrs: false
})

// const appConfig = useAppConfig()

const listTitle = 'Table of Content'

const config = computed(() => ({
    container: {
        base: 'border-b border-dashed border-gray-200 dark:border-gray-800 lg:border-0 space-y-3',
    },
    // button: {
    //     trailingIcon: {
    //         name: appConfig?.ui?.icons?.chevron,
    //         base: 'w-5 h-5 ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1.5',
    //         active: 'text-gray-700 dark:text-gray-200',
    //         inactive: 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 -rotate-90'
    //     }
    // },
    links: {}
}))

defineProps({
    links: {
        type: Array as PropType<TocLink[]>,
        default: () => []
    },
})
// const { ui } = useUI('content.toc', toRef(props, 'ui'), config, toRef(props, 'class'), true)
</script>
