<template>
    <button class="filter__toggle" @click="$emit('toggle')">
        <FiltersSvg />
        Filters
    </button>
</template>

<script lang="ts" setup>
    import FiltersSvg from '@/components/icons/FiltersSvg.vue'
    defineEmits<{
        (e: 'toggle'): void
    }>()
</script>

<style lang="scss" scoped>
    .filter__toggle {
        display: flex;
        gap: 0 10px;
        align-items: center;
        margin-bottom: 16px;
        color: #a18a68;
        cursor: pointer;
        background: transparent;

        .filter__icon {
            width: 18px;
            height: 18px;
        }

        @media (min-width: 769px) {
            display: none;
        }
    }
</style>
