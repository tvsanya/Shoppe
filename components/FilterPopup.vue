<template>
    <Transition name="slide">
        <div v-if="isOpen" class="filter__popup">
            <div class="popup__header">
                <FilterTitleIcon />
                <button class="popup__close" @click="$emit('close')">
                    <CloseIcon />
                </button>
            </div>
            <slot />
        </div>
    </Transition>
</template>

<script lang="ts" setup>
    import CloseIcon from '@/components/icons/CloseIcon.vue'
    import FilterTitleIcon from '@/components/icons/filterTitleIcon.vue'

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
        left: 0;
        z-index: 20;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 0 16px;
        overflow-y: auto;
        background: white;

        @media (min-width: 769px) {
            display: none;
        }
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.3s ease;
    }

    .slide-enter-from,
    .slide-leave-to {
        transform: translateX(-100%);
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
