<template>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <ul class="shop__catalog-list">
        <CatalogItem v-for="item in limitedItems" :key="item.id" :item="item" />
    </ul>
</template>

<script setup>
    import { onMounted, computed } from 'vue'
    import { useCatalogApi } from '@/composables/useCatalogApi'
    import CatalogItem from '@/components/catalog/CatalogItem.vue'

    const { catalogItems, isLoading, error, DEFAULT_ITEM_LIMIT, fetchCatalogItems } =
        useCatalogApi()

    const limitedItems = computed(() => {
        return catalogItems.value.slice(0, DEFAULT_ITEM_LIMIT)
    })

    onMounted(() => {
        fetchCatalogItems()
    })
</script>

<style lang="scss" scoped>
    .shop__catalog-list {
        display: grid;
        grid-template: repeat(2, auto) / repeat(3, auto);
        gap: 86px 50px;

        @media (max-width: $breakpoints-l) {
            gap: 70px 50px;
        }

        @media (max-width: $breakpoints-s) {
            grid-template: repeat(2, auto) / repeat(2, auto);
            gap: 24px 16px;
        }
    }
</style>
