<template>
    <button class="filter__toggle" @click="$emit('toggle')">
        <FiltersSvg />
        Filters
    </button>
</template>

<script lang="ts" setup>
defineEmits<{
    (e: 'toggle'): void
}>()
</script>

<style lang="scss" scoped>
.filter__toggle {
    color: #a18a68;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0 10px;
    margin-bottom: 16px;

    .filter__icon {
        width: 18px;
        height: 18px;
    }

    @media (min-width: 769px) {
        display: none;
    }
}
</style>
