<template>
    <div class="shop__catalog-heading">
        <h1 class="heading__title">Shop The Latest</h1>
        <NuxtLink to="/shop" class="heading__button-link">View All</NuxtLink>
    </div>
    <div class="shop__catalog-main">
        <CatalogList />
    </div>
</template>

<script setup>
    import CatalogList from '@/components/catalog/CatalogList.vue'
</script>

<style lang="scss" scoped>
    .shop__catalog-heading {
        display: flex;
        justify-content: space-between;
        margin-top: 64px;

        @media (max-width: $breakpoints-s) {
            margin-top: 22px;
        }

        .heading__title {
            @extend %h1;

            @media (max-width: $breakpoints-xl) {
                font-size: 30px;
            }

            @media (max-width: $breakpoints-m) {
                font-size: 26px;
            }

            @media (max-width: $breakpoints-s) {
                @include h5(#000000);
            }
        }

        .heading__button-link {
            @extend %h4;

            @media (max-width: $breakpoints-m) {
                font-size: 18px;
            }

            @media (max-width: $breakpoints-s) {
                @include body_medium(#a18a68);
            }
        }
    }

    .shop__catalog-main {
        margin-top: 40px;

        @media (max-width: $breakpoints-s) {
            margin-top: 14px;
        }
    }
</style>
