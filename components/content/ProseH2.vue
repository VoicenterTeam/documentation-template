<template>
    <h2
        :id="id"
        :class="ui.wrapper"
    >
        <NuxtLink
            :href="`#${id}`"
            class="group"
        >
            <div :class="ui.icon.wrapper">
                <UIcon
                    :name="ui.icon.name"
                    :class="ui.icon.base"
                />
            </div>

            <slot />
        </NuxtLink>
    </h2>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

const config = computed(() => ({
    wrapper: 'scroll-mt-[calc(48px+48px+var(--header-height))] lg:scroll-mt-[calc(48px+var(--header-height))]',
    icon: {
        wrapper: '-ml-6 pr-2 py-2 inline-flex opacity-0 group-hover:lg:opacity-100 transition-opacity absolute',
        base: 'w-4 h-4 text-primary',
        name: appConfig.ui?.icons?.hash || 'i-heroicons-hashtag-20-solid'
    }
}))

defineProps({
    id: {
        type: String,
        required: true
    }
})

const { ui } = useUI('content.prose.h2', undefined, config, undefined, true)
</script>
