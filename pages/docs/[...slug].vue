<template>
    <div class="w-full">
        <div>
            <ContentRenderer
                v-if="page?.body"
                :value="page"
                class=""
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

definePageMeta({
    layout: 'docs'
})

const { path } = useRoute()
const { data: page } = await useAsyncData(`content-${path}`, () => queryContent(path).findOne())

if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
        fatal: true
    })
}

useContentHead(page as Ref<ParsedContent>)
</script>
