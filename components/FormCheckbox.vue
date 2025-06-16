<template>
    <div class="form__checkbox-container">
        <div class="form__checkbox-wrapper">
            <input
                id="checkbox"
                v-model="internalValue"
                type="checkbox"
                :class="{ error: error }"
            />
            <label for="checkbox"
                ><span>{{ label }}</span></label
            >
        </div>
        <div v-if="error" class="form__error-message">
            {{ error }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: 'i agree to the website’s terms and conditions',
    },
    error: {
        type: String,
        default: '',
    },
})
const emit = defineEmits(['update:modelValue'])
const internalValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
})
</script>

<style lang="scss" scoped>
.form__checkbox-container {
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    .form__checkbox-wrapper {
        display: flex;
        align-items: center;
        gap: 4px;

        span {
            @include body_small(#000000);
        }
    }

    .form__error-message {
        @include h5(#ff5252);
        font-size: 14px;
        margin-top: 8px;
    }
}
</style>
