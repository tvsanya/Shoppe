<template>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <ul class="shop__catalog-list">
        <li v-for="item in catalogItems" :key="item.id" class="shop__catalog-item">
            <CatalogImg v-if="item.image" :image="item.image" :alt="item.title" />
            <h3 class="shop__catalog-item-title">{{ item.title }}</h3>
            <h4 :key="id" class="shop__catalog-item-price">$ {{ formatPrice(item.price) }}</h4>
        </li>
    </ul>
</template>

<script setup>
import { useCatalogApi } from '@/composables/useCatalog'

const { catalogItems, isLoading, error, fetchCatalogItems, formatPrice } = useCatalogApi()

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

    .shop__catalog-item {
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-width: 380px;
        width: 100%;

        @media (max-width: $breakpoints-l) {
            gap: 16px;
        }

        @media (max-width: $breakpoints-s) {
            gap: 6px;
        }

        &-title {
            @include h3(#000000);
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;

            @media (max-width: $breakpoints-l) {
                font-size: 18px;
            }

            @media (max-width: $breakpoints-s) {
                @include body_medium(#000000);
            }
        }

        &-price {
            @extend %h4;

            @media (max-width: $breakpoints-l) {
                font-size: 16px;
            }

            @media (max-width: $breakpoints-s) {
                @include body_small(#a18a68);
            }
        }
    }
}
</style>
