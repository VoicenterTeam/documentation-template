<template>
    <div
        v-if="hasPrev || hasNext"
        class="bottom-navigation grid sm:grid-cols-2 gap-8 mb-10"
    >
        <PageBottomNavLink
            v-if="hasPrev"
            :link="prev"
            :icon="ui.icons.navNext ?? ICON_NEXT"
            class="prev"
        />
        <span
            v-else
            class="hidden sm:block"
        />
        <PageBottomNavLink
            v-if="hasNext"
            :link="next"
            :icon="ui.icons.navPrev ?? ICON_PREV"
            class="next"
        />
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    path: string
}>()

const { prev, next } = useContent()

const { ui } = useAppConfig()

const ICON_NEXT = 'i-heroicons-arrow-left-20-solid'
const ICON_PREV = 'i-heroicons-arrow-right-20-solid'

const hasPrev = computed(() => {
    return prev?.value && prev.value?._path.startsWith(props.path)
})
const hasNext = computed(() => {
    return next?.value && next.value?._path.startsWith(props.path)
})

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
