<template>
  <div class="form__checkbox-container" :class="{ 'mobile-only': mobileOnly }">
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
    <div v-if="error" class="form-error-message">
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
    default: "i agree to the website’s terms and conditions",
  },
  error: {
    type: String,
    default: "",
  },
  mobileOnly: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped>
.form__checkbox-container {
  display: none;
}
@media (max-width: $breakpoints-l) {
  .form__checkbox-container {
    @include body_small(#000000);
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .form__checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .form-error-message {
      margin-top: 8px;
      font-size: 14px;
      color: #ff5252;
    }
  }
}
</style>
