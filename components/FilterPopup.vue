<template>
    <div class="filter__popup" :class="{ 'filter__popup--visible': isOpen }">
        <div class="popup__header">
            <FilterTitleIcon />
            <button class="popup__close" @click="$emit('close')">
                <CloseIcon />
            </button>
        </div>
        <slot />
    </div>
</template>

<script lang="ts" setup>
    import CloseIcon from '@/components/icons/CloseIcon.vue'
    import FilterTitleIcon from '@/components/icons/FilterTitleIcon.vue'

    defineProps<{
        isOpen: boolean
    }>()

    defineEmits<{
        (e: 'close'): void
    }>()
</script>

<style lang="scss" scoped>
    .filter__popup {
        position: fixed;
        top: 0;
        left: -100%;
        z-index: 20;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 0 16px;
        overflow-y: auto;
        background: white;
        transition: left 0.3s ease;

        &--visible {
            left: 0;
        }

        @media (min-width: 769px) {
            display: none;
        }
    }

    .popup__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0 32px;
    }

    .popup__close {
        cursor: pointer;
        background: none;
        border: none;
    }
</style>
