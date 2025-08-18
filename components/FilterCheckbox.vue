<template>
    <div class="checkbox__statuses">
        <div class="checkbox__status">
            <span>On Sale</span>
            <input id="status_one" v-model="onSaleModel" type="checkbox" class="status__toggle" />
            <label for="status_one"></label>
        </div>
        <div class="checkbox__status">
            <span>In stock</span>
            <input id="status_two" v-model="inStockModel" type="checkbox" class="status__toggle" />
            <label for="status_two"></label>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { computed } from 'vue'
    import { useCatalogFilters } from '@/composables/useCatalogFilter'

    const { filters } = useCatalogFilters()

    const onSaleModel = computed({
        get: () => filters.value.onSale ?? false,
        set: (value) => {
            filters.value.onSale = value || null
        },
    })

    const inStockModel = computed({
        get: () => filters.value.inStock ?? false,
        set: (value) => {
            filters.value.inStock = value || null
        },
    })
</script>

<style lang="scss" scoped>
    .checkbox__statuses {
        display: flex;
        flex-direction: column;
        gap: 42px 0;

        .checkbox__status {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            user-select: none;

            span {
                @include h5(#000000);
            }

            .status__toggle {
                display: none;
            }

            .status__toggle + label {
                position: relative;
                display: block;
                width: 34px;
                height: 20px;
                cursor: pointer;
                background-color: #707070;
                border-radius: 17px;

                &::after {
                    position: absolute;
                    top: 4px;
                    left: 4px;
                    width: 12px;
                    height: 12px;
                    content: '';
                    background-color: #ffffff;
                    border-radius: 50%;
                    transition: transform 0.3s;
                }
            }

            .status__toggle:checked + label {
                background-color: #a18a68;

                &::after {
                    transform: translateX(14px);
                }
            }
        }
    }
</style>
