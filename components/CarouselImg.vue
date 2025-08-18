<template>
    <img
        :src="props.image"
        :alt="props.alt"
        class="slider__slide-img"
        :class="{ 'slider__slider-img--loading': loading }"
        @load="handleLoad"
        @error="handleError"
    />
</template>

<script lang="ts" setup>
    import { ref } from 'vue'

    interface Props {
        image?: string
        alt?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        image: '',
        alt: '',
    })

    const loading = ref(false)
    const handleLoad = () => {
        loading.value = false
    }
    const handleError = () => {
        loading.value = false
        console.error('Ошибка загрузки изображения', props.image)
    }
</script>

<style lang="scss" scoped>
    .slider__slide-img {
        width: 100%;
        object-fit: cover;
        border-radius: 16px;

        @media (max-width: $breakpoints-m) {
            height: 274px;
        }

        @media (max-width: $breakpoints-s) {
            height: 354px;
        }
    }
</style>
