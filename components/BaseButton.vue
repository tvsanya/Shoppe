<template>
    <button
        :class="['base-button', `base-button--${type}`]"
        :style="buttonStyles"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
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

const isHover = ref(false)

const buttonStyles = computed(() => {
    const borderColor = isHover.value
        ? props.type === 'primary'
            ? '#000000'
            : 'ffffff'
        : props.type === 'primary'
          ? '#ffffff'
          : '#000000'

    const textColor = isHover.value ? '#ffffff' : props.type === 'primary' ? '#ffffff' : '#000000'

    return {
        border: `${props.borderWidth} ${props.borderStyle} ${borderColor}`,
        borderRadius: props.borderRadius,
        color: textColor,
        backgroundColor: isHover.value ? '#000000' : 'transparent',
    }
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
        &:hover {
            background-color: #000000;
        }
    }

    &--secondary {
        border-color: #000000;
        color: #ffffff;
    }
}
</style>
