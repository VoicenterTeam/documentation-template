<template>
    <div
        v-if="title"
        class="relative border-b border-gray-200 dark:border-gray-800 py-8"
    >
        <div
            v-if="headline && headline !== 'Docs'"
            class="mb-3 text-sm/6 font-semibold text-primary flex items-center gap-1.5"
        >
            {{ headline }}
        </div>
        <div class="flex flex-col lg:flex-row items-start gap-6">
            <div
                v-if="icon"
                class="flex"
            >
                <UIcon
                    :name="(icon as string)"
                    class="w-10 h-10 flex-shrink-0 text-primary"
                />
            </div>
            <div class="flex-1">
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                        <slot name="title">
                            {{ title }}
                        </slot>
                    </h1>
                </div>

                <div
                    v-if="description"
                    class="mt-4 text-lg text-gray-500 dark:text-gray-400"
                >
                    <slot name="description">
                        {{ description }}
                    </slot>
                </div>

                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    headline: {
        type: String,
        default: undefined
    },
    title: {
        type: String,
        default: undefined
    },
    description: {
        type: String,
        default: undefined
    },
    icon: {
        type: String,
        default: undefined
    }
})
</script>
