<template>
    <button class="catalog__item-btn">ADD TO CART</button>
</template>

<style lang="scss" scoped>
.catalog__item-btn {
    @include body_large(#000000);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 66px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0);
    border-radius: 0 0 6px 6px;
    z-index: 10;
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
