<template>
  <div class="input__message input__message-error">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: String,
});
</script>

<style lang="scss" scoped>
.input__message-error {
  color: #ff5252;
}
</style>
