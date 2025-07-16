<template>
    <div class="catalog__item-image-box">
        <img :src="props.image" :alt="props.alt" class="catalog__item-img" />
        <CatalogImgBtn class="catalog__button" />
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
</script>

<style lang="scss" scoped>
.catalog__item-image-box {
    position: relative;
    max-width: var(--img-max-width, 380px);
    max-height: var(--img-max-heigth, 380px);
    width: 100%;
    height: 100%;

    &:hover {
        .catalog__button {
            background: rgba(255, 255, 255, 0.5);
            opacity: 1;
        }
    }

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
}
</style>
