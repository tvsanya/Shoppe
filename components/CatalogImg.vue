<template>
    <div
        class="catalog__item-image-box"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <img :src="props.image" :alt="props.alt" class="catalog__item-img" />
        <CatalogImgBtn :isVisible="isHovered" />
    </div>
</template>

<script lang="ts" setup>
interface Props {
    image?: string
    alt?: string
}

const props = withDefaults(defineProps<Props>(), {
    image: '',
    alt: '',
})

const isHovered = ref(false)
</script>

<style lang="scss" scoped>
.catalog__item-image-box {
    position: relative;
    max-width: 380px;
    max-height: 380px;
    width: 100%;
    height: 100%;

    @media (max-width: $breakpoints-xl) {
        max-height: 270px;
    }

    @media (max-width: $breakpoints-l) {
        max-width: 210px;
        max-height: 210px;
    }

    @media (max-width: $breakpoints-m) {
        max-width: 136px;
        max-height: 136px;
    }

    .catalog__item-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 8px;
    }

    // &::after{
    //     @include body_large(#000000);
    //     content: 'ADD TO CART';
    //     position: absolute;
    //     bottom: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 66px;
    //     display: none;
    //     justify-content: center;
    //     align-items: center;
    //     background: rgba($color: #ffffff, $alpha: 0.5);
    //     border-radius: 0 0 6px 6px;
    // }

    // &:hover{
    //     &::after{
    //         display: flex;
    //     }
    // }
}
</style>
