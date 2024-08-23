<template>
    <div class="w-full flex flex-col flex-1 min-h-0 divide-y divide-gray-100 dark:divide-gray-800 relative overflow-hidden">
        <div class="relative flex items-center">
            <UIcon
                name="i-heroicons-magnifying-glass-20-solid"
                class="pointer-events-none absolute left-2 text-gray-400 dark:text-gray-500 h-5 w-5"
                aria-hidden="true"
            />
            <UInput
                ref="searchInput"
                v-model="query"
                :ui="{
                    wrapper: 'flex items-center px-10',
                    base: 'w-full placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-0 text-gray-900 dark:text-white focus:ring-0 focus:outline-none',
                    size: 'sm:text-sm',
                }"
                :padded="false"
                placeholder="Search..."
                aria-label="Search..."
                variant="none"
                class="w-full h-12 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-0 text-gray-900 dark:text-white focus:ring-0 focus:outline-none sm:text-sm"
                autocomplete="off"
            />
            <UButton
                icon="i-heroicons:x-mark-20-solid"
                aria-label="Close"
                class="absolute end-2"
                color="gray"
                variant="ghost"
                size="sm"
                @click="onClear"
            />
        </div>
        <div class="p-4">
            <div
                v-if="results?.length"
                class="text-sm text-gray-700 dark:text-gray-200 space-y-1"
            >
                <NuxtLink
                    v-for="result in filteredData(results || [])"
                    :key="result.id"
                    :to="result.id"
                    class="flex items-center gap-1.5 min-w-0 select-none rounded-md px-2.5 py-1.5 relative cursor-pointer group hover:bg-primary-50/50 dark:hover:bg-primary-950/30"
                    @click="onClear"
                >
                    <UIcon
                        name="i-heroicons:document-text"
                        class="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                    />
                    <div class="flex items-center gap-0.5 font-semibold">
                        <span
                            v-if="result.titles?.length"
                            class="truncate flex-none"
                        >
                            {{ `${result.titles[0]} > ` }}
                        </span>
                        <span class="truncate flex-none">
                            {{ `${result.title}:` }}
                        </span>
                    </div>
                    <span class="truncate text-gray-400 dark:text-gray-500">
                        {{ result.content }}
                    </span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SearchResult } from 'minisearch'

const SCORED = 20
const emit = defineEmits([ 'clear' ])

const query = ref('')
const searchInput = ref()

const results = await searchContent(query, {})

const filteredData = (data: Array<SearchResult>) => {
    return data.filter((item, index) => (!index || item.score >= SCORED) && (item.id !== '/' && !item.id.startsWith('/#')))
}

function onClear () {
    nextTick(() => {
        emit('clear')
    })
}

onMounted(() => {
    nextTick(() => {
        searchInput.value?.$el?.querySelector('input')?.focus()
    })
})
</script>

<style scoped>

</style>
