<template>
  <div class="input__container">
    <input
      :value="modelValue"
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
interface ComponentProps {
  modelValue?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  message?: string;
  variant?: "error" | "success";
}

const props = defineProps({
  modelValue: {
    type: String,
    default: undefined,
  },
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  required: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: undefined,
  },
  variant: {
    type: String as PropType<ComponentProps["variant"]>,
    validator: (value: unknown): value is "error" | "success" =>
      typeof value === "string" && ["error", "success"].includes(value),
    default: "error",
  },
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  input: [event: Event];
}>();

const handleInput = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
  emit("input", e);
};
</script>

<style lang="scss" scoped>
.input__container {
  position: relative;
  width: 370px;
  .input__field {
    width: 100%;
  }
  .input__message {
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
  }
}
@media (max-width: $breakpoints-l) {
  .input__container {
    .input__message {
      margin-top: 50px;
    }
  }
}
@media (max-width: $breakpoints-s) {
  .input__container {
    width: 262px;
  }
}
</style>
