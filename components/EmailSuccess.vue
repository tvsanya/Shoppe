<template>
  <div class="input__message input__message-success">
    {{ message }}
  </div>
</template>

<script setup>
defineProps({
  message: String,
});
</script>

<style lang="scss" scoped>
.input__message-success {
  color: #4caf50;
}
</style>
