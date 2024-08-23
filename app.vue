<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
<!--    <UContainer>-->
<!--        <UCard class="mt-10">-->
<!--            <template #header>-->
<!--                <div class="flex justify-between">-->
<!--                    <h1>Welcome to Nuxt UI Starter</h1>-->
<!--                    <ColorScheme>-->
<!--                        <USelect-->
<!--                            v-model="$colorMode.preference"-->
<!--                            :options="['system', 'light', 'dark']"-->
<!--                        />-->
<!--                    </ColorScheme>-->
<!--                </div>-->
<!--                <pre>{{ $colorMode }}</pre>-->
<!--            </template>-->
<!--            <UButton-->
<!--                icon="i-heroicons-book-open"-->
<!--                to="https://ui.nuxt.com"-->
<!--                target="_blank"-->
<!--            >-->
<!--                Open Nuxt UI Documentation-->
<!--            </UButton>-->
<!--        </UCard>-->
<!--    </UContainer>-->
</template>
<script setup lang="ts">

const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const colorMode = useColorMode()

provide('navigation', navigation)

const color = computed(() => colorMode.value === 'dark' ? '#18181b' : 'white')

useHead({
    meta: [
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            key: 'theme-color',
            name: 'theme-color',
            content: color
        }
    ],
    htmlAttrs: {
        lang: 'en'
    }
})
</script>

<style>
body {
  @apply antialiased font-sans text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900;
}
</style>
