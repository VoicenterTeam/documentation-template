<template>
    <div
        :class="{'is--group': link.children}"
        class="w-full"
    >
        <template v-if="!link.children">
            <NuxtLink
                class="nav-item truncate flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                :to="link.to"
            >
                <div class="nav-icon-block">
                    <UIcon
                        :name="link.icon"
                        class="nav-icon"
                    />
                </div>
                <span class="text-base truncate">{{ link.label }}</span>
            </NuxtLink>
        </template>
        <template v-else>
            <div class="group-block">
                <div
                    class="flex relative items-center gap-2 group-item-folder truncate cursor-pointer"
                    @click="open = !open"
                >
                    <div class="nav-icon-block">
                        <UIcon
                            :name="link.icon"
                            class="nav-icon"
                        />
                    </div>
                    <span class="text-base truncate">{{ link.label }}</span>
                    <UIcon
                        :name="'i-heroicons-chevron-right-20-solid'"
                        :class="{ 'rotate-90': open }"
                        class="nav-action-icon absolute right-0 transition-all duration-200"
                        size="22"
                    />
                </div>
                <div class="pl-2 groups-data">
                    <div
                        v-show="open"
                        class="pt-3"
                    >
                        <template
                            v-for="(navItem, i) in link.children"
                            :key="`${navItem.to || `nav-${i}`}`"
                        >
                            <PageNavigationLinks :link="navItem" />
                        </template>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { INavigationMapped } from '~/types'

defineProps<{
    link: INavigationMapped
}>()


const open = ref(false)
</script>

