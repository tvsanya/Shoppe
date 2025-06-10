<template>
  <div
    class="search__container"
    :class="{ 'search__container--active': isOpen || isMobile }"
  >
    <button class="search__button">
      <SearchInputComp />
    </button>
    <input
      class="search__input"
      type="text"
      placeholder="Search"
      @keyup.esc="closeSearch"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  isOpen: Boolean,
  isMobile: Boolean,
});
const emit = defineEmits(["close"]);
const inputRef = ref<HTMLInputElement | null>(null);

watch(
  () => props.isOpen,
  (newVal) => {
    if (
      newVal &&
      !props.isMobile &&
      inputRef.value &&
      typeof window !== "undefined"
    ) {
      (inputRef.value as HTMLInputElement).focus();
    }
  }
);
const closeSearch = () => {
  if (!props.isMobile) {
    emit("close");
  }
};
</script>

<style lang="scss" scoped>
.search__container {
  @include body_medium(#707070);
  display: none;
  background-color: #efefef;
  height: 32px;
  border-radius: 4px;
  padding-left: 10px;
  gap: 8px;
  align-items: center;
  margin-top: 18px;
  .search__button {
    background-color: transparent;
    svg path {
      fill: none;
      color: #707070;
    }
  }
  .search__input {
    background: transparent;
    width: 100%;
    height: 100%;
  }
  &--active {
    display: flex;
  }
}
@media (max-width: $breakpoints-m) {
  .search__container {
    margin-top: 4px;
  }
}
</style>
