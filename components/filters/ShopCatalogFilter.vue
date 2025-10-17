<template>
    <form class="shop-filter">
        <div class="shop-filter__search">
            <input
                v-model="filters.search"
                type="text"
                placeholder="Search..."
                class="shop-filter__search-input"
            />
            <button class="shop-filter__search-button">
                <SearchComp />
            </button>
        </div>
        <div class="shop-filter__select">
            <CatalogFilterSelect />
        </div>
        <div class="shop-filter__price">
            <div class="shop-filter__slider-container">
                <RangeSlider v-model="filters.priceRange" :min="0" :max="1000" />
            </div>
            <div class="shop-filter__price-info">
                <span class="shop-filter__price-range"
                    >Price: ${{ filters.priceRange[0] }} - ${{ filters.priceRange[1] }}</span
                >
                <span class="shop-filter__price-filter">Filter</span>
            </div>
        </div>
        <FilterCheckbox class="shop-filter__checkbox" />
    </form>
</template>

<script lang="ts" setup>
    import SearchComp from '@/components/icons/SearchComp.vue'
    import CatalogFilterSelect from '@/components/filters/CatalogFilterSelect.vue'
    import RangeSlider from '@/components/ui/RangeSlider.vue'
    import FilterCheckbox from '@/components/filters/FilterCheckbox.vue'
    import { useCatalogFilters } from '@/composables/useCatalogFilter'

    const { filters } = useCatalogFilters()
</script>

<style lang="scss" scoped>
    .shop-filter {
        width: 100%;
        max-width: 262px;

        &__search {
            display: flex;
            align-items: center;
            max-width: 100%;
            margin-bottom: 40px;
            border-bottom: 1px solid #d8d8d8;

            &-input {
                @include body-medium(#707070);

                width: 100%;
                padding: 12px 0;
            }

            &-button {
                background: transparent;
            }
        }

        &__select {
            display: flex;
            flex-direction: column;
            gap: 16px 0;
            max-width: 100%;
            margin-bottom: 40px;
        }

        &__price {
            display: flex;
            flex-direction: column;
            gap: 12px 0;
            margin-bottom: 40px;

            &-info {
                display: flex;
                justify-content: space-between;
            }

            &-range {
                @include body-medium(#707070);
            }

            &-filter {
                @include body-medium(#a18a68);
            }
        }
    }
</style>
