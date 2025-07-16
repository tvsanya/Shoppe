<template>
    <div class="filter__popup" :class="{ 'filter__popup--visible': isOpen }">
      <div class="popup__header">
        <FilterPopupTitle/>
        <button class="popup__close" @click="$emit('close')">
          <CloseBtn/>
        </button>
      </div>
      <slot></slot>

    </div>
</template>

<script lang="ts" setup>
import FilterPopupTitle from '@/components/FilterPopupTitle.vue';

defineProps<{
  isOpen: Boolean
}>()

const emit = defineEmits<{
  (e: 'close'):void
}>()
</script>

<style lang="scss" scoped>
.filter__popup {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 20;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 16px;

  &--visible {
    left: 0;
  }
  
  @media (min-width: 769px) {
    display: none;
  }
}

.popup__header {
  padding: 16px 0 32px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup__close {
  background: none;
  border: none;
  cursor: pointer;

}


</style>