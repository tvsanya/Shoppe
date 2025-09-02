<template>
    <div class="shop__catalog-container">
        <div v-if="isLoading" class="loading">Loading...</div>
        <div v-else-if="error" class="error">{{ error }}</div>

        <template v-else>
            <ul key="catalog" class="shop__catalog-list">
                <CatalogItem v-for="item in paginatedItems" :key="item.id" :item="item" />
            </ul>
            <Pagination
                v-if="totalPages > 1"
                :current-page="currentPage"
                :total-pages="totalPages"
                :items-per-page="DEFAULT_ITEM_LIMIT"
                :max-items="filteredProducts.length"
                @page-changed="handlePageChange"
            />
        </template>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, computed, watch, ref } from 'vue'
    import { useCatalogFilters } from '@/composables/useCatalogFilter'
    import CatalogItem from '@/components/CatalogItem.vue'
    import Pagination from '@/components/Pagination.vue'

    const {
        filteredProducts,
        isLoading,
        error,
        DEFAULT_ITEM_LIMIT,
        fetchCatalogItems,
        catalogItems,
    } = useCatalogFilters()

    const currentPage = ref(1)

    onMounted(() => {
        if (catalogItems.value.length === 0) {
            fetchCatalogItems()
        }
    })

    watch(filteredProducts, () => {
        currentPage.value = 1
    })

    const totalPages = computed(() => {
        return Math.ceil(filteredProducts.value.length / DEFAULT_ITEM_LIMIT)
    })
    const paginatedItems = computed(() => {
        const start = (currentPage.value - 1) * DEFAULT_ITEM_LIMIT
        const end = start + DEFAULT_ITEM_LIMIT
        return filteredProducts.value.slice(start, end)
    })

    const handlePageChange = (page: number) => {
        currentPage.value = page
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
</script>

<style lang="scss" scoped>
    .shop__catalog-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        min-height: 600px;

        .loading {
            @extend %h2;
        }

        .error {
            @extend %h2;

            color: red;
        }

        .shop__catalog-list {
            display: grid;
            grid-template: repeat(2, auto) / repeat(3, auto);
            gap: 70px 24px;
            width: 100%;
            margin-bottom: 86px;

            --item-max-width: 300px;
            --img-max-heigth: 300px;

            @media (max-width: $breakpoints-l) {
                grid-template: repeat(2, auto) / repeat(2, auto);
                gap: 24px 16px;
            }
        }
    }
</style>
