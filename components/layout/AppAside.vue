<template>
    <aside class="app-aside-block">
        <div class="relative">
            <div>
                <div class="flex flex-col gap-3 mb-3 general-list">
                    <template
                        v-for="(navItem, i) in navigation"
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
defineProps<{
    navigation: Array<INavigationMapped>
}>()

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
    .groups-data .nav-item {
        @apply border-s border-gray-200 dark:border-gray-800 space-y-2 pl-2 mb-1;
    }
    .group-block:has(a.router-link-active) {
        & > .group-item-folder > .nav-icon-block {
            @apply text-primary-500 dark:text-primary-400;
        }
    }
    .group-block .group-block {
        @apply pt-2;
    }
}
</style>
