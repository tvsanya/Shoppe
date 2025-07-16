<template>
    <form class="shop__filter">
        <div class="shop__filter-search">
            <input type="text" placeholder="Search..." class="search__input" />
            <button class="search__button">
                <SearchComp />
            </button>
        </div>
        <div class="shop__filter-select">
            <CatalogFilterSelect />
        </div>
        <div class="shop__filter-price">
            <div class="price__slider-container">
                <RangeSlider v-model="priceRange" :min="0" :max="200" />
            </div>
            <div class="price__title">
                <span class="title__values"
                    >Price: ${{ priceRange[0] }} - ${{ priceRange[1] }}</span
                >
                <span class="title__filter">Filter</span>
            </div>
        </div>
        <FilterCheckbox class="shop__filter-checkbox" />
    </form>
</template>

<script lang="ts" setup>
const priceRange = ref<[number, number]>([40, 200])

watch(
    priceRange,
    (newVal: [number, number]) => {
        console.log('Price range changed:', newVal)
    },
    { deep: true }
)
</script>

<style lang="scss" scoped>
.shop__filter {
    max-width: 262px;
    width: 100%;

    &-search {
        display: flex;
        align-items: center;
        max-width: 100%;
        margin-bottom: 40px;
        border-bottom: 1px solid #d8d8d8;

        .search__input {
            @include body-medium(#707070);
            width: 100%;
            padding: 12px 0;
        }

        .search__button {
            background: transparent;
        }
    }

    &-select {
        display: flex;
        gap: 16px 0;
        max-width: 100%;
        flex-direction: column;
        margin-bottom: 40px;

        .filter__select-wrapper {
            position: relative;
            display: flex;
            align-items: center;

            .select__arrow {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                pointer-events: none;
            }
        }
    }

    &-price {
        display: flex;
        flex-direction: column;
        gap: 12px 0;
        margin-bottom: 40px;

        .price__title {
            display: flex;
            justify-content: space-between;

            .title__values {
                @include body-medium(#707070);
            }

            .title__filter {
                @include body-medium(#a18a68);
            }
        }
    }
}
</style>
