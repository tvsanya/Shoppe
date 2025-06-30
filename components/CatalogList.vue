<template>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <ul class="shop__catalog-list">
        <CatalogItem
            v-for="item in catalogItems"
            :key="item.id"
            :image="item.image"
            :title="item.title"
            :price="item.price"
        />
    </ul>
</template>

<script setup>
import { useCatalogApi } from '@/composables/useCatalog'
import CatalogItem from '@/components/CatalogItem.vue'

const { catalogItems, isLoading, error, fetchCatalogItems } = useCatalogApi()

onMounted(() => {
    fetchCatalogItems(6)
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
