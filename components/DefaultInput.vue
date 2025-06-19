<template>
    <div class="input__container">
        <input
            v-model="model"
            class="input__field"
            :type="type"
            :name="name"
            :placeholder="placeholder"
            :required="required"
            @input="handleInput"
        />
        <p v-if="message" class="input__message" :class="variant">
            {{ props.message }}
        </p>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    modelValue?: string
    type: string
    name?: string
    placeholder?: string
    required?: boolean
    message?: string
    variant?: 'error' | 'success'
}

const model = defineModel<string>()

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    required: false,
    variant: 'error',
})

const handleInput = (e: Event): void => {
    const target = e.target as HTMLInputElement
    model.value = target.value
}
</script>

<style lang="scss" scoped>
.input__container {
    position: relative;
    width: 370px;

    @media (max-width: $breakpoints-s) {
        width: 262px;
    }

    .input__field {
        @include h5(#707070);
        width: 100%;
    }

    .input__message {
        @include h5(#707070);
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 20px;
        font-size: 14px;
        transition: all 0.3s;

        &.error {
            color: #ff5252;
        }

        &.success {
            color: #4caf50;
        }

        @media (max-width: $breakpoints-l) {
            margin-top: 50px;
        }
    }
}
</style>
