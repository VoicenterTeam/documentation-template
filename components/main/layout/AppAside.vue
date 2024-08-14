<template>
    <aside>
        <div class="relative">
            <UAccordion
                :items="mapNavigation(navigation || [])"
                :ui="{ wrapper: 'flex flex-col w-full' }"
            >
                <template #item="{ item }">
                    <UVerticalNavigation :links="getMappedLinks(item.data)" />
                </template>
            </UAccordion>
        </div>
    </aside>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import type { NavItem } from '@nuxt/content'

const navigation = inject<Ref<NavItem[]>>('navigation')

function mapNavigation (navigation: Array<NavItem>) {
    return navigation.find(i => i._path === '/docs')?.children?.map((item) => {
        return {
            label: item.title,
            icon: 'i-heroicons-square-3-stack-3d',
            content: '',
            data: item
        }
    })
}
function getMappedLinks (data: NavItem) {
    return data.children?.map((item) => {
        return {
            label: item.title,
            icon: 'i-heroicons-command-line',
            to: item._path
        }
    })
}
</script>

<style scoped>

</style>
