<template>
    <div class="slider__slides-group swiper" ref="swiperContainer">
        <div class="swiper-wrapper">
            <SliderItem
                v-for="(slide, index) in slides"
                :key="index"
                :image="slide.imageUrl"
                :title="slide.title"
                class="slider__slide swiper-slide"
            />
        </div>
        <div class="custom-pagination swiper-pagination"></div>
    </div>
</template>

<script setup>
import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import SliderItem from '@/components/SliderItem.vue'

const swiperContainer = ref(null)
const swiperInstance = ref(null)
const slides = ref([])
const loading = ref(false)
const error = ref(null)

const generateSlides = () => {
    return Array.from({ length: 10 }, (_, i) => ({
        title: `Изображение ${i + 1}`,
        imageUrl: `https://picsum.photos/1000/600?random=${i}`,
        id: i,
    }))
}

const fetchSlides = async () => {
    try {
        loading.value = true

        await new Promise((resolve) => setTimeout(resolve, 800))
        slides.value = generateSlides()
    } catch (err) {
        error.value = 'Ошибка загрузки изображения'
        console.error(err)
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    await fetchSlides()

    await nextTick()

    if (swiperContainer.value && slides.value.length > 0) {
        try {
            swiperInstance.value = new Swiper(swiperContainer.value, {
                modules: [Pagination, Autoplay],
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                autoplay: {
                    delay: 100000000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.custom-pagination',
                    clickable: true,
                },
            })
        } catch (err) {
            console.error('Ошибка инициализации Swiper:', err)
        }
    }
})

onBeforeMount(() => {
    if (swiperInstance.value) {
        swiperInstance.value.destroy()
        swiperInstance.value = null
    }
})
</script>

<style lang="scss" scoped>
.custom-pagination {
    position: absolute;
    bottom: 26px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 14px;
    z-index: 10;
    overflow: hidden;
    height: 20px;

    @media (max-width: $breakpoints-l) {
        bottom: 12px;
    }

    @media (max-width: $breakpoints-s) {
        bottom: 6px;
    }

    :deep(.swiper-pagination-bullet) {
        position: relative;
        width: 10px;
        height: 10px;
        background: #ffffff;
        border-radius: 50%;
        border-color: #ffffff;
        opacity: 1;
        transition: background 0.3s;
        margin: 0;

        @media (max-width: $breakpoints-m) {
            width: 6px;
            height: 6px;
        }

        @media (max-width: $breakpoints-s) {
            width: 4px;
            height: 4px;
        }
    }

    :deep(.swiper-pagination-bullet-active) {
        background: transparent;
        border: 1px solid white;
        transform: scale(1.5);

        @media (max-width: $breakpoints-m) {
            width: 8px;
            height: 8px;
        }

        @media (max-width: $breakpoints-s) {
            width: 6px;
            height: 6px;
        }
    }
}
</style>
