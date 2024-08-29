<template>
    <div class="main-navigation-block">
        <PageNavigationLink
            v-for="navItem in links"
            :key="navItem.link"
            :link-data="navItem"
        />
    </div>
</template>

<script setup lang="ts">
interface ILinkData {
    label: string
    link: string
    info?: string
    icon?: string
}
defineProps<{
    links: Array<ILinkData>
}>()
</script>
