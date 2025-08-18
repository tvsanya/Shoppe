<template>
    <button
        class="burger__button"
        :class="{ open: props.isOpen }"
        aria-label="Toggle menu"
        @click="emit('toggle')"
    >
        <span class="button__line" />
        <span class="button__line" />
        <span class="button__line" />
    </button>
</template>

<script lang="ts" setup>
    interface Props {
        isOpen: boolean
    }

    const props = defineProps<Props>()
    const emit = defineEmits<{
        (e: 'toggle'): void
    }>()
</script>

<style scoped lang="scss">
    .burger__button {
        position: relative;
        z-index: 9;
        width: 20px;
        height: 16px;
        cursor: pointer;
        background-color: transparent;
        transition: transform 0.3s ease;

        .button__line {
            position: absolute;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #000000;
            transition: all 0.3s ease;

            &:nth-child(1) {
                top: 0;
                transform: rotate(0);
            }

            &:nth-child(2) {
                top: 50%;
                opacity: 1;
                transform: translateY(-50%);
            }

            &:nth-child(3) {
                bottom: 0;
                width: 70%;
                margin-left: 30%;
                transform: rotateX(0);
            }
        }

        &.open {
            transform: rotate(90deg);

            .button__line {
                &:nth-child(1) {
                    top: 50%;
                    transform: translateY(-50%) rotate(45deg);
                }

                &:nth-child(2) {
                    display: none;
                }

                &:nth-child(3) {
                    position: absolute;
                    top: 50%;
                    width: 100%;
                    margin: 0;
                    transform: translateY(-50%) rotate(-45deg);
                }
            }
        }
    }
</style>
