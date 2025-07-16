<template>
    <div class="shop__catalog-heading">
        <h1 class="heading__title" v-if="!isMobile">Shop The Latest</h1>
        <h1 class="heading__title heading__title--mobile" v-if="isMobile">Shop</h1>
    </div>
    <div class="shop__catalog-main">
        <FilterToggleButton v-if="isMobile" @toggle="openFilters" />

        <FilterPopup
            v-if="isMobile"
            :is-open="isFiltersVisible"
            @close="closeFilters"
            @apply="applyFilters"
        >
            <ShopCatalogFilter class="shop__filter--mobile" />
        </FilterPopup>
        <div class="shop__catalog-wrapper">
            <ShopCatalogFilter v-if="!isMobile" />
            <ShopCatalogList />
        </div>
    </div>
</template>

<script setup>
import FilterToggleButton from '@/components/FilterToggleButton.vue'
import FilterPopup from '@/components/FilterPopup.vue'

const { isMobile } = useMobile()

const isFiltersVisible = ref(false)

const openFilters = () => {
    isFiltersVisible.value = true
    document.body.style.overflow = 'hidden'
}

const closeFilters = () => {
    isFiltersVisible.value = false
    document.body.style.overflow = ''
}
</script>

<style lang="scss" scoped>
.shop__catalog-heading {
    margin: 96px 0 40px;

    @media (max-width: $breakpoints-l) {
        margin: 36px 0;
    }

    @media (max-width: $breakpoints-s) {
        margin: 24px 0 16px 0;
    }

    .heading__title {
        @extend %h1;

        &.heading__title--mobile {
            @media (max-width: $breakpoints-m) {
                font-size: 26px;
            }

            @media (max-width: $breakpoints-s) {
                @include h3(#000000);
            }
        }
    }
}
.shop__catalog-main {
    position: relative;
    display: block;

    .shop__filter--mobile {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 100%;
    }

    .shop__catalog-wrapper {
        display: flex;
        justify-content: space-between;
        gap: 0 36px;
    }
}
</style>
