<template>
    <div class="catalog__item-image-box">
        <img
            v-if="props.image"
            :src="props.image"
            :alt="props.alt"
            class="catalog__item-img"
            @error="handleImageError"
        />
        <img
            v-else
            :src="placeholderImage"
            :alt="props.alt || 'Изображение товара'"
            class="catalog__item-img catalog__item-img--placeholder"
        />
        <CatalogImgBtn class="catalog__button" />
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import placeholderImage from '@/assets/image/plug.png'
    interface Props {
        image?: string
        alt?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        image: '',
        alt: '',
    })

    const imageError = ref(false)

    const handleImageError = (event: Event) => {
        imageError.value = true
        const imgElement = event.target as HTMLImageElement
        imgElement.src = placeholderImage
    }
</script>

<style lang="scss" scoped>
    .catalog__item-image-box {
        position: relative;
        width: 100%;
        max-width: var(--item-max-width, 380px);
        height: var(--img-max-height, 380px);
        overflow: hidden;
        border-radius: 8px;

        &:hover {
            .catalog__button {
                background: rgba(255, 255, 255, 0.5);
                opacity: 1;
            }
        }

        @media (max-width: $breakpoints-xl) {
            max-width: 270px;
            height: 270px;
        }

        @media (max-width: $breakpoints-l) {
            max-width: 100%;
            height: 210px;
        }

        @media (max-width: $breakpoints-m) {
            max-width: 100%;
            height: 136px;
        }

        .catalog__item-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center;
        }

        .catalog__item-img--placeholder {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
</style>
