<template>
    <li class="shop__catalog-item">
        <CatalogImg v-if="item.image" :image="item.image" :alt="item.title" />
        <span v-if="item.onSale" class="shop__catalog-item-badge shop__catalog-item-badge--sale"
            >-{{ discountPercentage }}%</span
        >
        <span
            v-if="!item.inStock"
            class="shop__catalog-item-badge shop__catalog-item-badge--sold"
            :class="{ 'right-position': item.onSale }"
            >Sold Out</span
        >
        <h3 class="shop__catalog-item-title">{{ props.item.title }}</h3>
        <h4 class="shop__catalog-item-price">
            <template v-if="item.onSale">
                <span class="discounted-price">$ {{ formatPrice(discountedPrice) }}</span>
                <span class="original-price">$ {{ formatPrice(item.price) }}</span>
            </template>
            <template v-else>$ {{ formatPrice(item.price) }}</template>
        </h4>
    </li>
</template>

<script lang="ts" setup>
    import { computed } from 'vue'
    import { useCatalogApi, type CatalogItem } from '@/composables/useCatalogApi'
    interface Props {
        item: CatalogItem
    }

    const props = defineProps<Props>()
    const { formatPrice } = useCatalogApi()

    const discountPercentage = computed(() => {
        return Math.floor(Math.random() * 41) + 10
    })

    const discountedPrice = computed(() => {
        if (!props.item.onSale) return props.item.price
        return props.item.price * (1 - discountPercentage.value / 100)
    })
</script>
<style lang="scss" scoped>
    .shop__catalog-item {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
        max-width: var(--item-max-width, 380px);

        @media (max-width: $breakpoints-l) {
            gap: 16px;
        }

        @media (max-width: $breakpoints-s) {
            gap: 6px;
        }

        &-badge {
            position: absolute;
            padding: 2px 6px;
            border-radius: 4px;

            &--sale {
                @include body-small(#ffffff);

                top: 16px;
                left: 16px;
                width: 46px;
                height: 24px;
                background-color: #a18a68;
            }

            &--sold {
                @include body-small(#ffffff);

                top: 16px;
                left: 16px;
                width: 64px;
                height: 24px;
                background-color: #a18a68;

                &.right-position {
                    right: 16px;
                    left: auto;
                }
            }
        }

        &-title {
            @include h3(#000000);

            display: -webkit-box;
            padding: 2px 0;
            overflow: hidden;
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

            .original-price {
                @extend %h4;

                color: #9e9e9e;
                text-decoration: line-through;

                @media (max-width: $breakpoints-l) {
                    font-size: 16px;
                }

                @media (max-width: $breakpoints-s) {
                    @include body_small(#9e9e9e);
                }
            }

            .discounted-price {
                @extend %h4;

                margin-right: 6px;

                @media (max-width: $breakpoints-l) {
                    font-size: 16px;
                }

                @media (max-width: $breakpoints-s) {
                    @include body_small(#a18a68);
                }
            }

            @media (max-width: $breakpoints-l) {
                font-size: 16px;
            }

            @media (max-width: $breakpoints-s) {
                @include body_small(#a18a68);
            }
        }
    }
</style>
