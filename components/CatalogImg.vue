<template>
    <div class="catalog__item-image-box">
        <img :src="props.image" :alt="props.alt" class="catalog__item-img" />
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
}
</style>
