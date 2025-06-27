<template>
    <button class="catalog__item-img-btn" :class="{ 'is-visible': isVisible }">ADD TO CART</button>
</template>

<script lang="ts" setup>
defineProps<{
    isVisible: boolean
}>()
</script>

<style lang="scss" scoped>
.catalog__item-img-btn {
    @include body_large(#000000);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 66px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 0 0 6px 6px;
    z-index: 10;
    opacity: 0;
    transition: all 0.3s;

    &.is-visible {
        opacity: 1;
    }
}
</style>
