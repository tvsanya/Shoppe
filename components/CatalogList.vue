<template>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <ul class="shop__catalog-list">
        <CatalogItem v-for="item in catalogItems" :key="item.id" :item="item" />
    </ul>
</template>

<script setup>
    import { onMounted } from 'vue'
    import { useCatalogApi } from '@/composables/useCatalogApi'
    import CatalogItem from '@/components/CatalogItem.vue'

    const { catalogItems, isLoading, error, DEFAULT_ITEM_LIMIT, fetchCatalogItems } =
        useCatalogApi()

    onMounted(() => {
        fetchCatalogItems({ limit: DEFAULT_ITEM_LIMIT, applyLimit: true })
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
