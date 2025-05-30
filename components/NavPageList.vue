<template>
  <ul class="header__nav-pages-list">
    <li
      v-for="(item, index) in navPages"
      :key="index"
      class="header__pages-item"
    >
      <NuxtLink :to="item.path" class="header__pages-item-link">{{
        item.title
      }}</NuxtLink>
    </li>
  </ul>
</template>

<script setup>
const navPages = [
  { path: "/about", title: "About" },
  { path: "/blog", title: "Blog" },
  { path: "/story", title: "Our Story" },
];
</script>

<style lang="scss" scoped>
.header__nav-pages-list {
  display: flex;
  gap: 64px;
  .header__pages-item-link:focus {
    @extend %focus-line;
  }
}
</style>
