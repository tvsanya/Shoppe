<template>
    <li class="shop__catalog-item">
        <CatalogImg v-if="image" :image="image" :alt="title" />
        <h3 class="shop__catalog-item-title">{{ title }}</h3>
        <h4 class="shop__catalog-item-price">$ {{ formatPrice(price) }}</h4>
    </li>
</template>

<script lang="ts" setup>
interface Props {
    image?: string
    title: string
    price: number
}

const props = defineProps<Props>()
const { formatPrice } = useCatalogApi()
</script>
<style lang="scss" scoped>
.shop__catalog-item {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: var(--item-max-width, 380px);
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
</style>
