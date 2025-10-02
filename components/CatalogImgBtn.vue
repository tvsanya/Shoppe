<template>
    <button class="catalog__item-btn" @click="addToCart">ADD TO CART</button>
</template>

<script lang="ts" setup>
    const emit = defineEmits<{
        (e: 'itemAdded'): void
    }>()

    const addToCart = () => {
        emit('itemAdded')
    }
</script>

<style lang="scss" scoped>
    .catalog__item-btn {
        @include body_large(#000000);

        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 66px;
        background: rgba(255, 255, 255, 0);
        border-radius: 0 0 6px 6px;
        opacity: 0;
        transition: all 0.3s;

        @media (max-width: $breakpoints-xl) {
            height: 44px;
        }

        @media (max-width: $breakpoints-m) {
            height: 32px;
            font-size: 12px;
        }
    }
</style>
