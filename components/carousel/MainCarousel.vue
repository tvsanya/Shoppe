<template>
    <div ref="swiperContainer" class="slider__slides-group swiper">
        <div class="swiper-wrapper">
            <CarouselItem
                v-for="(slide, index) in slides"
                :key="index"
                :image="slide.imageUrl"
                :title="slide.title"
                class="slider__slide swiper-slide"
            />
        </div>
        <div class="custom-pagination swiper-pagination" :style="paginationStyle"></div>
    </div>
</template>

<script lang="ts" setup>
    import { computed, ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
    import Swiper from 'swiper'
    import { Pagination, Autoplay } from 'swiper/modules'
    import type { Swiper as SwiperType } from 'swiper'
    import 'swiper/css'
    import 'swiper/css/pagination'
    import CarouselItem from '@/components/carousel/CarouselItem.vue'

    interface PaginationProps {
        size?: string
        activeScale?: number
        filled?: boolean
        color?: string
    }

    interface Slide {
        title: string
        imageUrl: string
        id: number
    }

    const props = withDefaults(defineProps<PaginationProps>(), {
        size: '10px',
        activeScale: 1.5,
        filled: false,
        color: 'white',
    })

    const paginationStyle = computed(() => ({
        '--bullet-size': props.size,
        '--bullet-scale': props.activeScale,
        '--bullet-color': props.filled ? props.color : 'transparent',
        '--bullet-border': props.filled ? 'none' : `1px solid ${props.color}`,
    }))

    const wait = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

    const swiperContainer: Ref<HTMLElement | null> = ref(null)
    const swiper: Ref<SwiperType | null> = ref(null)

    const slides = computed<Slide[]>(() =>
        Array.from({ length: 10 }, (_, i) => ({
            title: `Изображение ${i + 1}`,
            imageUrl: `https://picsum.photos/1000/600?random=${i}`,
            id: i,
        })),
    )

    const initSwiper = (): void => {
        if (swiperContainer.value) {
            swiper.value = new Swiper(swiperContainer.value, {
                modules: [Pagination, Autoplay],
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.custom-pagination',
                    clickable: true,
                },
            })
        }
    }

    const destroySwiper = () => {
        swiper.value?.destroy()
        swiper.value = null
    }

    onMounted(async (): Promise<void> => {
        await wait(800)
        initSwiper()
    })

    onBeforeUnmount(() => {
        destroySwiper()
    })
</script>

<style lang="scss" scoped>
    .custom-pagination {
        position: absolute;
        bottom: 26px;
        left: 0;
        z-index: 10;
        display: flex;
        gap: 14px;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 20px;
        overflow: hidden;
        color: v-bind('props.color');

        @media (max-width: $breakpoints-l) {
            bottom: 12px;
        }

        @media (max-width: $breakpoints-s) {
            bottom: 6px;
        }

        :deep(.swiper-pagination-bullet) {
            position: relative;
            width: var(--bullet-size);
            height: var(--bullet-size);
            margin: 0;
            background: white;
            border: var(--bullet-border);
            border-radius: 50%;
            opacity: 1;
            transition: all 0.3s;

            @media (max-width: $breakpoints-m) {
                --bullet-size: 6px;
            }

            @media (max-width: $breakpoints-s) {
                --bullet-size: 4px;
            }
        }

        :deep(.swiper-pagination-bullet-active) {
            background: var(--bullet-color);
            transform: scale(var(--bullet-scale));

            @media (max-width: $breakpoints-m) {
                --bullet-size: 8px;
            }

            @media (max-width: $breakpoints-s) {
                --bullet-size: 6px;
            }
        }
    }
</style>
