<template>
    <div class="custom__slider-container">
        <Slider
            v-model="value"
            :min="min"
            :max="max"
            :tooltips="false"
            :style="sliderStyles"
            range
            class="custom__slider"
        />
    </div>
</template>

<script lang="ts" setup>
    import { defineProps, defineEmits, computed } from 'vue'
    import Slider from '@vueform/slider'
    import '@vueform/slider/themes/default.css'

    interface Props {
        modelValue: [number, number]
        min?: number
        max?: number
        connectColor?: string
        handleColor?: string
        trackHeight?: string
        handleWidth?: string
        handleHeight?: string
    }

    interface SliderStyles {
        '--slider-connect-bg': string
        '--slider-handle-bg': string
        '--slider-height': string
        '--slider-handle-width': string
        '--slider-handle-height': string
    }

    const props = withDefaults(defineProps<Props>(), {
        min: 0,
        max: 1000,
        connectColor: '#000000',
        handleColor: '#000000',
        trackHeight: '4px',
        handleWidth: '2px',
        handleHeight: '10px',
    })

    const emit = defineEmits<{
        (e: 'update:modelValue', value: [number, number]): void
    }>()

    const value = computed({
        get: () => props.modelValue,
        set: (val: [number, number]) => emit('update:modelValue', val),
    })

    const sliderStyles = computed<SliderStyles>(() => ({
        '--slider-connect-bg': props.connectColor,
        '--slider-handle-bg': props.handleColor,
        '--slider-height': props.trackHeight,
        '--slider-handle-width': props.handleWidth,
        '--slider-handle-height': props.handleHeight,
    }))
</script>

<style lang="scss" scoped>
    .custom__slider-container {
        width: 100%;
    }

    :deep(.custom__slider) {
        --slider-connect-bg: #000000;
        --slider-handle-bg: #000000;
        --slider-height: 4px;
        --slider-handle-width: 2px;
        --slider-handle-height: 10px;

        height: auto;
        padding: 8px 0;

        .slider-handle {
            width: var(--slider-handle-width);
            height: var(--slider-handle-height);
            cursor: pointer;
            background: var(--slider-handle-bg);
            border: none;
            border-radius: 0;
            box-shadow: none;
            transition: height 0.2s ease;
        }

        .slider-connect {
            top: 0;
            width: 100%;
            height: var(--slider-height);
            background: var(--slider-connect-bg);
        }

        .slider-base {
            height: var(--slider-height);
            background: #e0e0e0;
        }

        .slider-touch-area {
            width: 20px;
            height: 24px;
        }
    }
</style>
