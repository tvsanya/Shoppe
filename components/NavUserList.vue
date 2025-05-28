<template>
  <ul class="header__nav-users-list">
    <li
      v-for="(item, index) in navUser"
      :key="index"
      class="header__users-item"
    >
      <NuxtLink :to="item.path" class="header__users-item-link">
        <img :src="item.src" :alt="item.alt" />
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>
const navUser = [
  { path: "/search", src: "/icons/Search.svg", alt: "Search" },
  { path: "/shopcart", src: "/icons/ShopCart.svg", alt: "ShopCart" },
  { path: "/profile", src: "/icons/Profile.svg", alt: "Profile" },
];
</script>

<style lang="scss" scoped>
.header__nav-users-list {
  display: flex;
  gap: 39px;
  align-items: center;
  .header__users-item-link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    position: relative;
    transition: all 0.3s ease;
    &:focus,
    &:active {
      &::after {
        content: "";
        position: absolute;
        bottom: -28px;
        left: 0;
        height: 3px;
        width: 24px;
        background: #000000;
        width: 24px;
      }
    }
    img {
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
}
</style>
