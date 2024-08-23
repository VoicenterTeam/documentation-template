<template>
    <NuxtLink
        v-if="link"
        :to="link._path"
        class="bottom-navigation-link group"
    >
        <div
            v-if="icon"
            :class="ICON.wrapper"
            class="icon-wrapper"
        >
            <UIcon
                :name="icon"
                :class="ICON.icon"
            />
        </div>
        <div class="font-medium text-gray-900 dark:text-white text-[15px] mb-1">
            {{ link.title }}
        </div>
        <div class="text-sm font-normal text-gray-500 dark:text-gray-400 line-clamp-2">
            {{ link.description }}
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

const ICON = {
    wrapper: 'inline-flex items-center rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 ring-1 ring-gray-300 dark:ring-gray-700 mb-4 group-hover:ring-primary/50',
    icon: 'w-5 h-5 text-gray-900 dark:text-white group-hover:text-primary'
}

defineProps<{
    link?: Pick<ParsedContent, string> | null
    icon?: string
}>()
</script>

