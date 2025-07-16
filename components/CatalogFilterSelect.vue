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
            v-model="selectedCategory"
            :options="categories"
            placeholder="Sort By"
            :searchable="false"
            :show-caret="false"
            :clearable="false"
            class="select__sort"
            :style="selectStyles"
        />
        <SelectArrow class="select__arrow" :is-open="isSortOpen" @click="toggleDropdown('sort')" />
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
import SelectArrow from '@/components/SelectArrow.vue'

interface Category {
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

const categories: Category[] = [
    { value: 'furniture', label: 'Furniture' },
    { value: 'lighting', label: 'Lighting' },
    { value: 'decor', label: 'Decor' },
    { value: 'textiles', label: 'Textiles' },
]

const selectedCategory = ref(null)
const isCategoryOpen = ref(false)
const isSortOpen = ref<boolean>(false)

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
</script>

<style lang="scss" scoped>
.filter__select-wrapper {
    position: relative;
}

:deep(.select__category),
:deep(.select__sort) {
    @include body-medium(#000000);

    .multiselect-single-label {
        @include body-medium(#000000);
        width: 100%;
    }

    .multiselect-dropdown {
        border-top: none;
        margin-top: 0;
        box-shadow: none;
    }

    .multiselect-option {
        @include body-medium(#000000);
        padding: 8px 12px;

        &.is-selected {
            background: #a18a68;
            color: #ffffff;
        }

        &.is-pointed {
            background: #a18a68;
            color: #ffffff;
        }
    }

    .multiselect-caret {
        display: none;
    }

    .multiselect-clear {
        position: absolute;
        right: 18px;

        .multiselect-clear:hover {
            color: #a18a68;
        }
    }
}

.select__arrow {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    pointer-events: none;
    width: 12px;
    height: 12px;
    color: #a18a68;
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
