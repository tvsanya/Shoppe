<template>
    <div class="shop__catalog-heading">
        <h1 class="heading__title" :class="{ 'heading__title--mobile': isMobile }">
            {{ isMobile ? 'Shop' : 'Shop The Latest' }}
        </h1>
    </div>
    <div class="shop__catalog-main">
        <template v-if="isMobile">
            <FilterToggleButton @toggle="openFilters" />

            <FilterPopup :is-open="isFiltersVisible" @close="closeFilters">
                <ShopCatalogFilter class="shop__filter--mobile" />
            </FilterPopup>
            <ShopCatalogList />
        </template>
        <template v-else>
            <div class="shop__catalog-wrapper">
                <ShopCatalogFilter />
                <ShopCatalogList />
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { useMobile } from '@/composables/useMobile'
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
            margin: 24px 0 16px;
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
            flex-direction: column;
            justify-content: center;
            max-width: 100%;
        }

        .shop__catalog-wrapper {
            display: flex;
            gap: 0 36px;
            justify-content: space-between;
        }
    }
</style>
