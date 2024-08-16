<template>
    <div class="bottom-navigation grid sm:grid-cols-2 gap-8">
        <PageBottomNavLink
            v-if="prev"
            :link="prev"
            icon="i-heroicons-arrow-left-20-solid"
            class="prev"
        />
        <span
            v-else
            class="hidden sm:block"
        />
        <PageBottomNavLink
            v-if="next"
            :link="next"
            icon="i-heroicons-arrow-right-20-solid"
            class="next"
        />
    </div>
</template>

<script setup lang="ts">
import PageBottomNavLink from '~/components/main/PageBottomNavLink.vue'

const { prev, next } = useContent()

</script>

<style lang="scss">
.bottom-navigation {
    &-link {
        @apply block rounded-lg py-3 px-4 border border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50;
        &.next {
            @apply text-right;
        }
    }
}
</style>
