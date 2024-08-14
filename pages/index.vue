<template>
    <div class="w-full">
        <div class="w-full">
            Index Vue Page
            <div>
                <ContentRenderer
                    v-if="page?.body"
                    :value="page"
                    class="prose"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import type { ParsedContent } from '@nuxt/content'

definePageMeta({
    layout: 'docs'
})


const { data: page } = await useAsyncData('content-/', () => queryContent('/').findOne())

if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
        fatal: true
    })
}

useContentHead(page as Ref<ParsedContent>)
</script>

<style>

</style>
