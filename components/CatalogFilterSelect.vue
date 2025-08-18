<template>
    <div class="filter__select-wrapper">
        <Multiselect
            v-model="selectedCategory"
            :options="categories"
            placeholder="Category"
            :searchable="false"
            :close-on-select="true"
            :show-caret="false"
            :clearable="false"
            :style="selectStyles"
            class="select__category"
        />
        <SelectArrow
            class="select__arrow"
            :is-open="isCategoryOpen"
            @click="toggleDropdown({ type: 'category' })"
        />
    </div>
    <div class="filter__select-wrapper">
        <Multiselect
            v-model="filters.sortBy"
            :options="sorties"
            placeholder="Sort By"
            :searchable="false"
            :show-caret="false"
            :clearable="false"
            class="select__sort"
            :style="selectStyles"
        />
        <SelectArrow class="select__arrow" :is-open="isSortOpen" />
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed, watch } from 'vue'
    import Multiselect from '@vueform/multiselect'
    import '@vueform/multiselect/themes/default.css'
    import SelectArrow from '@/components/icons/SelectArrow.vue'
    import { useCatalogFilters } from '@/composables/useCatalogFilter'
    import { useCatalogApi } from '@/composables/useCatalog'

    interface Category {
        value: string
        label: string
    }

    interface Sort {
        value: string
        label: string
    }

    interface SelectStyles {
        '--ms-bg': string
        '--ms-border-color': string
        '--ms-border-width': string
        '--ms-radius': string
        '--ms-py': string
        '--ms-px': string
        '--ms-dropdown-radius': string
        '--ms-dropdown-border-width': string
        '--ms-dropdown-border-color': string
        '--ms-placeholder-color': string
        '--ms-font-size': string
        '--ms-clear-color-hover': string
    }

    interface DropdownToggleParams {
        type: 'category' | 'sort'
    }

    const { filters } = useCatalogFilters()
    const { fetchCatalogItems } = useCatalogApi()

    const categories: Category[] = [
        { value: "women's clothing", label: 'Women Clothing' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'jewelery', label: 'Jewelery' },
        { value: "men's clothing", label: 'Mens Clothing' },
    ]

    const sorties: Sort[] = [
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A to Z' },
        { value: 'name-desc', label: 'Name: Z to A' },
    ]

    const isCategoryOpen = ref(false)
    const isSortOpen = ref<boolean>(false)

    const selectedCategory = computed({
        get: () => filters.value.category || '',
        set: (value) => {
            filters.value.category = value || null
        },
    })

    const selectStyles = computed<SelectStyles>(() => ({
        '--ms-bg': 'white',
        '--ms-border-color': '#d8d8d8',
        '--ms-border-width': '1px',
        '--ms-radius': '4px',
        '--ms-py': '16px',
        '--ms-px': '12px',
        '--ms-dropdown-radius': '0 0 4px 4px',
        '--ms-dropdown-border-width': '1px',
        '--ms-dropdown-border-color': '#d8d8d8',
        '--ms-placeholder-color': '#000000',
        '--ms-font-size': '14px',
        '--ms-clear-color-hover': '#D82700',
    }))

    const toggleDropdown = (params: DropdownToggleParams): void => {
        if (params.type === 'category') {
            isCategoryOpen.value = !isCategoryOpen.value
        } else {
            isSortOpen.value = !isSortOpen.value
        }
    }

    watch(
        () => filters.value.category,
        async (newCategory) => {
            if (newCategory) {
                const response = await fetch(
                    `https://fakestoreapi.com/products/category/${newCategory}`,
                )
                const data = await response.json()
                await fetchCatalogItems({
                    category: newCategory,
                    items: data,
                })
            } else {
                await fetchCatalogItems({ limit: 6 })
            }
        },
    )
</script>

<style lang="scss" scoped>
    .filter__select-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    :deep(.select__category),
    :deep(.select__sort) {
        @include body-medium(#000000);

        .multiselect-single-label {
            @include body-medium(#000000);

            width: 100%;
        }

        .multiselect-dropdown {
            margin-top: 0;
            border-top: none;
            box-shadow: none;
        }

        .multiselect-option {
            @include body-medium(#000000);

            padding: 8px 12px;

            &.is-selected {
                color: #ffffff;
                background: #a18a68;
            }

            &.is-pointed {
                color: #ffffff;
                background: #a18a68;
            }
        }

        .multiselect-caret {
            display: none;
        }

        .multiselect-clear {
            position: absolute;
            right: 28px;

            .multiselect-clear:hover {
                color: #a18a68;
            }
        }
    }

    .select__arrow {
        position: absolute;
        top: 50%;
        right: 16px;
        z-index: 1;
        width: 12px;
        height: 12px;
        color: #a18a68;
        pointer-events: none;
        transform: translateY(-50%);
        transition: transform 0.3s ease;
    }

    .is-open ~ .select__arrow {
        transform: translateY(-50%) rotate(180deg);
    }

    .is-open .multiselect-single-label {
        border-radius: 4px 4px 0 0;
        box-shadow: none;
    }

    .is-active {
        box-shadow: none;
    }
</style>
