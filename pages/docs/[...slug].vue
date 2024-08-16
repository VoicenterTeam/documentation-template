<template>
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-4">
            <div class="lg:col-span-2 lg:max-h-[calc(100vh-var(--header-height))] relative lg:sticky lg:top-[var(--header-height)] overflow-y-auto -mx-3 px-3 overflow-x-hidden">
                <AppAside class="py-8" />
            </div>
            <div
                :class="tocList?.length ? 'lg:col-span-6' : 'lg:col-span-8'"
                class=" min-h-[calc(100vh-var(--header-height))] px-3 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900"
            >
                <div class="w-full">
                    <PageHeader
                        :title="page?.title"
                        :description="page?.description"
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
                    <hr class="my-12 border-gray-200 dark:border-gray-800">
                    <div class="mb-12">
                        <PagePrevNext />
                    </div>
                </div>
            </div>
            <div
                v-if="tocList?.length"
                class="hidden lg:block lg:col-span-2 lg:max-h-[calc(100vh-var(--header-height))] sticky top-[var(--header-height)] overflow-y-auto -mx-3 px-4 overflow-x-hidden"
            >
                <PageTocList :links="tocList" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'
import AppAside from '~/components/main/layout/AppAside.vue'
import PageTocList from '~/components/main/PageTocList.vue'
import PagePrevNext from '~/components/main/PagePrevNext.vue'
import PageHeader from '~/components/main/PageHeader.vue'
import { splitByCase, upperFirst } from 'scule'

definePageMeta({
    layout: 'docs'
})

const { path } = useRoute()
const { data: page } = await useAsyncData('docs', () => queryContent(path).findOne())
if (!page.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page not found',
        fatal: true
    })
}

useContentHead(page as Ref<ParsedContent>)
useSeoMeta({
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
    if (path.endsWith('/get-started')) {
        const newObj = { ...page.value } as  ParsedContent
        if (newObj.body?.children) {
            newObj.body.children = newObj.body.children.filter(child => child.tag !== 'h1')
        }
        return newObj
    }

    return page.value
})

function findPageHeadline (page?: ParsedContent | null): string {
    if (!page) {
        return ''
    }
    return page._dir?.title ? page._dir.title : splitByCase(page._dir).map(p => upperFirst(p)).join(' ')
}
</script>
