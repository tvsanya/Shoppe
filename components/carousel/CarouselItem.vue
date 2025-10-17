<template>
    <div class="slider__slide-item">
        <CarouselImg :src="props.image" :alt="props.title" />
        <div class="item__content">
            <div class="item__content-title">Gold big hoops</div>
            <div class="item__content-price">$ 68,00</div>
            <BaseButton type="primary" class="item__content-btn">View Product</BaseButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import CarouselImg from '@/components/carousel/CarouselImg.vue'

    interface Props {
        image: string
        title?: string
    }

    const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
    .slider__slide-item {
        position: relative;

        .item__content {
            position: absolute;
            top: 38%;
            left: 40px;

            @media (max-width: $breakpoints-l) {
                left: 24px;
            }

            @media (max-width: $breakpoints-s) {
                top: 62%;
                left: 8px;
            }

            &-title {
                @extend %h1;

                margin-bottom: 16px;
                color: #ffffff;

                @media (max-width: $breakpoints-l) {
                    margin-bottom: 10px;
                    font-size: 26px;
                }

                @media (max-width: $breakpoints-m) {
                    margin-bottom: 8px;
                    font-size: 22px;
                }

                @media (max-width: $breakpoints-s) {
                    margin-bottom: 3px;
                    font-size: 20px;
                }
            }

            &-price {
                @extend %h2;

                color: #ffffff;

                @media (max-width: $breakpoints-l) {
                    font-size: 20px;
                }

                @media (max-width: $breakpoints-m) {
                    font-size: 18px;
                }

                @media (max-width: $breakpoints-s) {
                    @include body-medium(#ffffff);
                }
            }

            &-btn {
                margin-top: 48px;
                transition: all 0.3s;

                @media (max-width: $breakpoints-l) {
                    padding: 12px 14px;
                    margin-top: 14px;
                    font-size: 16px;
                }

                @media (max-width: $breakpoints-m) {
                    padding: 8px 10px;
                    margin-top: 12px;
                    font-size: 14px;
                }

                @media (max-width: $breakpoints-s) {
                    @include body-small(#ffffff);

                    padding: 6px 8px;
                    margin-top: 10px;
                }
            }
        }
    }
</style>
