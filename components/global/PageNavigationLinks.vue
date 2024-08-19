<template>
    <div class="w-full">
        <template v-if="!link.children">
            <NuxtLink
                class="flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                :to="link.to"
            >
                <div class="nav-icon-block">
                    <UIcon
                        :name="link.icon"
                        class="nav-icon"
                    />
                </div>
                {{ link.label }}
            </NuxtLink>
        </template>
        <template v-else>
            <div class="group-block">
                <div class="flex items-center gap-2">
                    <div class="nav-icon-block">
                        <UIcon
                            :name="link.icon"
                            class="nav-icon"
                        />
                    </div>
                    {{ link.label }}
                </div>

                <div class="pl-2 pt-3">
                    <UVerticalNavigation
                        :links="link.children"
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
                                inactive: 'text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200'
                            },
                            active: 'flex items-center text-primary-500 dark:text-primary-400 border-current font-semibold active-link',
                            inactive: 'flex items-center border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
                        }"
                    />
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
</script>

