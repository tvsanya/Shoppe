<template>
    <button
        :class="['base-button', `base-button--${props.type}`]"
        :style="{
            borderWidth,
            borderStyle,
            borderRadius,
        }"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
    interface Props {
        type?: 'primary' | 'secondary'
        borderWidth?: string
        borderRadius?: string
        borderStyle?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        type: 'primary',
        borderRadius: '6px',
        borderStyle: 'solid',
        borderWidth: '2px',
    })
</script>

<style lang="scss" scoped>
    .base-button {
        max-width: 194px;
        padding: 12px 28px;
        font-family: $font-family;
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;

        &--primary {
            color: #ffffff;
            background-color: transparent;
            border-color: #ffffff;

            &:hover {
                color: #ffffff;
                background-color: #000000;
                border-color: #000000;
            }
        }

        &--secondary {
            color: #ffffff;
            border-color: #000000;

            &:hover {
                color: #ffffff;
                background-color: #000000;
                border-color: #000000;
            }
        }
    }
</style>
