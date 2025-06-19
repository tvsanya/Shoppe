<template>
    <div class="slider__slide-item">
        <SliderImg :src="image" :alt="title" />
        <div class="item__content">
            <div class="item__content-title">Gold big hoops</div>
            <div class="item__content-price">$ 68,00</div>
            <button class="item__content-btn">View Product</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SliderImg from '@/components/SliderImg.vue'

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
            left: 8px;
            top: 62%;
        }

        &-title {
            @extend %h1;
            margin-bottom: 16px;
            color: #ffffff;

            @media (max-width: $breakpoints-l) {
                font-size: 26px;
                margin-bottom: 10px;
            }

            @media (max-width: $breakpoints-m) {
                font-size: 22px;
                margin-bottom: 8px;
            }

            @media (max-width: $breakpoints-s) {
                font-size: 20px;
                margin-bottom: 3px;
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
            @include button-white(2px solid #fff, 6px, #ffffff);
            margin-top: 48px;

            @media (max-width: $breakpoints-l) {
                font-size: 16px;
                margin-top: 14px;
                padding: 12px 14px;
            }

            @media (max-width: $breakpoints-m) {
                font-size: 14px;
                margin-top: 12px;
                padding: 8px 10px;
            }

            @media (max-width: $breakpoints-s) {
                @include body-small(#ffffff);
                margin-top: 10px;
                padding: 6px 8px;
            }
        }
    }
}
</style>
