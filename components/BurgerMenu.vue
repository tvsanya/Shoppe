<template>
  <button
    class="burger__button"
    @click="$emit('toggle')"
    :class="{ open: isOpen }"
    aria-label="Toggle menu"
  >
    <span class="button__line"></span>
    <span class="button__line"></span>
    <span class="button__line"></span>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
defineEmits(["toggle"]);
</script>

<style scoped lang="scss">
.burger__button {
  width: 20px;
  height: 16px;
  position: relative;
  background-color: transparent;
  cursor: pointer;
  z-index: 100;
  transition: transform 0.3s ease;
  .button__line {
    width: 100%;
    height: 2px;
    background-color: #000000;
    position: absolute;
    left: 0;
    transition: all 0.3s ease;
    &:nth-child(1) {
      top: 0;
      transform: rotate(0);
    }
    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
      opacity: 1;
    }
    &:nth-child(3) {
      bottom: 0;
      transform: rotateX(0);
      width: 70%;
      margin-left: 30%;
    }
  }
  &.open{
    transform: rotate(90deg);
    .button__line{
      &:nth-child(1){
        transform: translateY(-50%) rotate(45deg);
        top: 50%;
      }
      &:nth-child(2){
        display: none;
      }
      &:nth-child(3){
        transform: translateY(-50%) rotate(-45deg);
        position: absolute;
        margin: 0;
        top: 50%;
        width: 100%;
      }
    }
  }
}
</style>
