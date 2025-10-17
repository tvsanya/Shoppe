<template>
    <Transition name="notification-slide">
        <div v-if="isVisible" class="notification">
            <CheckIcon class="check__icon" />
            <div class="notification__content">
                <div class="notification__content-text">
                    The item was added to your Shopping bag.
                </div>
                <button class="notification__content-btn">VIEW CART</button>
            </div>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue'

    interface Props {
        isVisible: boolean
        duration?: number
    }

    const props = withDefaults(defineProps<Props>(), {
        duration: 4000,
    })

    const emit = defineEmits<{
        close: []
    }>()

    const isVisible = ref(props.isVisible)
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    watch(
        () => props.isVisible,
        (newVal) => {
            if (newVal) {
                showNotification()
            } else {
                hideNotification()
            }
        },
    )

    const showNotification = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }

        isVisible.value = true

        if (props.duration > 0) {
            timeoutId = setTimeout(() => {
                hideNotification()
            }, props.duration)
        }
    }

    const hideNotification = () => {
        isVisible.value = false
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
        emit('close')
    }
</script>

<style lang="scss" scoped>
    .notification {
        position: fixed;
        top: 108px;
        left: 20%;
        z-index: 5;
        display: flex;
        align-items: center;
        width: 58%;
        height: 68px;
        padding: 0 24px 0 40px;
        background-color: #efefef;
        border-radius: 4px;

        @media (max-width: $breakpoints-xl) {
            left: 10%;
            width: 80%;
        }

        @media (max-width: $breakpoints-l) {
            left: 4%;
            width: 92%;
        }

        @media (max-width: $breakpoints-m) {
            top: 100px;
            left: 6%;
            width: 88%;
            height: 60px;
        }

        @media (max-width: $breakpoints-s) {
            top: 104px;
            left: 4%;
            width: 92%;
            padding: 0 24px;
        }

        .notification__content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding-left: 16px;

            &-text {
                @include h5(#000000);

                @media (max-width: $breakpoints-xl) {
                    font-size: 14px;
                }

                @media (max-width: $breakpoints-m) {
                    font-size: 12px;
                }

                @media (max-width: $breakpoints-s) {
                    font-size: 10px;
                }
            }

            &-btn {
                @include body_large(#a18a68);

                background: transparent;

                @media (max-width: $breakpoints-xl) {
                    font-size: 14px;
                }

                @media (max-width: $breakpoints-m) {
                    font-size: 12px;
                }

                @media (max-width: $breakpoints-s) {
                    font-size: 10px;
                }
            }
        }
    }

    .notification-slide-enter-active,
    .notification-slide-leave-active {
        transition: all 0.4s ease;
    }

    .notification-slide-enter-from {
        opacity: 0;
        transform: translateY(-100%);
    }

    .notification-slide-leave-to {
        opacity: 0;
        transform: translateY(-100%);
    }
</style>
