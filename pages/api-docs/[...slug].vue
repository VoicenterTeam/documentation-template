<template>
    <div class="w-full grid lg:grid-cols-10 lg:gap-4">
        <div
            :class="tocList?.length ? 'lg:col-span-8' : 'lg:col-span-10'"
            class="min-h-[calc(100vh-var(--header-height))] px-3 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900"
        >
            <div class="w-full">
                <PageHeader
                    :title="page?.title"
                    :headline="headline"
                    :icon="page?.icon"
                />
                <div class="w-full">
                    <ContentRenderer
                        v-if="page?.body"
                        :value="pageContent"
                        class="my-8 prose prose-primary dark:prose-invert max-w-none w-full"
                    >
                        <template #empty>
                            <p>No content found.</p>
                        </template>
                    </ContentRenderer>
                </div>
                <hr class="my-8 border-gray-200 dark:border-gray-800">
            </div>
        </div>
        <div
            v-if="tocList?.length"
            class="hidden lg:block lg:col-span-2 lg:max-h-[calc(100vh-var(--header-height))] sticky top-[var(--header-height)] overflow-y-auto -mx-3 px-4 overflow-x-hidden"
        >
            <PageTocList :links="tocList" />
        </div>
    </div>
</template>
<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'
import { splitByCase, upperFirst } from 'scule'

definePageMeta({
    layout: 'api-docs'
})

const { seo } = useAppConfig()
const { path } = useRoute()

const { data: page } = await useAsyncData('api-docs', () => queryContent(path).findOne())

if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
        fatal: true
    })
}

useContentHead(page as Ref<ParsedContent>)

useSeoMeta({
    titleTemplate: seo.apiHeaderTemplate ?? '%s - API',
    title: `${page.value.title}`,
    ogTitle: `${page.value.title}`,
    description: page.value.description,
    ogDescription: page.value.description
})

// defineOgImage({
//     component: 'Docs',
//     title: page.value.title,
//     description: page.value.description
// })

const tocList = computed(() => {
    return page?.value?.body?.toc?.links
})
const headline = computed(() => {
    return findPageHeadline(page.value)
})
const pageContent = computed(() => {
    if (!page.value) {
        return undefined
    }
    // if (path.endsWith('/get-started')) {
    //     const newObj = { ...page.value } as  ParsedContent
    //     if (newObj.body?.children) {
    //         newObj.body.children = newObj.body.children.filter(child => child.tag !== 'h1')
    //     }
    //     return newObj
    // }

    return page.value
})
function findPageHeadline (page?: ParsedContent | null): string {
    if (!page) {
        return ''
    }
    return page._dir?.title ? page._dir.title : splitByCase(page._dir).map(p => upperFirst(p)).join(' ')
}
</script>
