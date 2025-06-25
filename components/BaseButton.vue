<template>
    <button
        :class="['base-button', `base-button--${type}`]"
        :style="{
            borderWidth,
            borderStyle,
            borderRadius
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
    font-size: 20px;
    font-family: $font-family;
    font-weight: 700;
    padding: 12px 28px;
    max-width: 194px;
    transition: all 0.3s ease;
    cursor: pointer;

    &--primary {
        color: #ffffff;
        border-color: #ffffff;
        background-color: transparent;
        &:hover {
            background-color: #000000;
            color: #ffffff;
            border-color: #000000;
        }
    }

    &--secondary {
        border-color: #000000;
        color: #ffffff;
        &:hover{
            background-color: #000000;
            color: #ffffff;
            border-color: #000000;
        }
    }
}
</style>
