<template>
    <div class="filter__select-wrapper">
        <Select
            v-model="selectedCategory"
            :options="categories"
            placeholder="Category"
            optionLabel="label"
            optionValue="value"
            showClear
            class="select__category"
        />
    </div>
    <div class="filter__select-wrapper">
        <Select
            v-model="filters.sortBy"
            :options="sorties"
            placeholder="Sort By"
            optionLabel="label"
            optionValue="value"
            showClear
            class="select__sort"
        />
    </div>
</template>

<script lang="ts" setup>
    import { computed, watch } from 'vue'
    import { useCatalogFilters } from '@/composables/useCatalogFilter'
    import { useCatalogApi } from '@/composables/useCatalogApi'

    const { filters } = useCatalogFilters()
    const { fetchCatalogItems } = useCatalogApi()

    const categories = [
        { value: "women's clothing", label: 'Women Clothing' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'jewelery', label: 'Jewelery' },
        { value: "men's clothing", label: 'Mens Clothing' },
    ]

    const sorties = [
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A to Z' },
        { value: 'name-desc', label: 'Name: Z to A' },
    ]

    const selectedCategory = computed({
        get: () => filters.value.category || null,
        set: (value) => {
            filters.value.category = value || null
        },
    })

    watch(
        () => filters.value.category,
        async (newCategory) => {
            try {
                await fetchCatalogItems({
                    category: newCategory,
                })
            } catch (error) {
                console.error('Error fetching category items:', error)
            }
        },
    )
</script>

<style lang="scss">
    .filter__select-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        .select__category,
        .select__sort {
            @include body-medium(#000000);

            display: flex;
            width: 100%;
            padding: 16px 12px 16px 16px;
            border: 2px solid #d8d8d8;
            border-radius: 4px;

            .p-select-label {
                @include body-medium(#000000);

                overflow: unset;
            }
        }
    }

    .p-select-overlay {
        @include body-medium(#000000);

        --p-select-overlay-background: #efefef;
        --p-select-overlay-border-radius: 4px;
    }

    .p-select-option {
        --p-select-option-padding: 12px 6px;
        --p-select-option-border-radius: 4px;

        &-selected {
            --p-select-option-selected-background: #a18a68;
            --p-select-option-selected-focus-background: #a18a68;
        }

        &:hover {
            background-color: #a18a68;
        }
    }

    .p-select-clear-icon {
        --p-select-dropdown-width: 14%;

        &:hover {
            --p-select-clear-icon-color: red;
        }

        @media (max-width: $breakpoints-s) {
            --p-select-dropdown-width: 10%;
        }
    }

    .p-select .p-select-dropdown-icon {
        transition: transform 0.3s ease;
    }

    .p-select.p-select-open .p-select-dropdown-icon {
        transform: rotate(180deg);
    }
</style>
