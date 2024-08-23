<template>
    <div>
        <UTooltip
            text="Search"
            :shortcuts="[metaSymbol, 'K']"
            :popper="{ strategy: 'absolute' }"
        >
            <UButton
                :icon="appConfig.ui.icons.search || defaultIcon"
                truncate
                color="gray"
                variant="ghost"
                aria-label="Search"
                @click="toggleContentSearch"
            />
        </UTooltip>
        <UModal
            v-model="isOpen"
            :ui="{
                width: 'w-screen sm:max-w-2xl'
            }"
        >
            <SearchModalContent
                v-if="isOpen"
                @clear="onClear"
            />
        </UModal>
    </div>
</template>

<script setup lang="ts">
import SearchModalContent from '~/components/layout/SearchModalContent.vue'

const defaultIcon = 'i-heroicons-magnifying-glass-20-solid'
const metaSymbol = 'Ctrl'


const appConfig = useAppConfig()

const isOpen = ref<boolean>(false)


const canToggleModal = computed(() => !isOpen.value)

const toggleContentSearch = () => {
    isOpen.value = !isOpen.value
}
const onClear = () => {
    isOpen.value = !isOpen.value
}

defineShortcuts({
    meta_k: {
        usingInput: true,
        whenever: [ canToggleModal ],
        handler: () => {
            isOpen.value = !isOpen.value
        }
    },
    escape: {
        usingInput: true,
        whenever: [ isOpen ],
        handler: () => { isOpen.value = false }
    }
})
</script>

<style>

</style>
