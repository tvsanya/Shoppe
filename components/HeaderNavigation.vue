<template>
  <div class="header__top" :class="{ 'has-border': !isHomePage }">
    <NuxtLink to="/" class="header__top-logo">
      <img src="~/assets/image/logo/SHOPPE.png" alt="SHOPPE" />
    </NuxtLink>
    <nav class="header__top-nav">
      <ul class="header__nav-pages-list">
        <li class="header__pages-item">
          <NuxtLink to="/about" class="header__pages-item-link">About</NuxtLink>
        </li>
        <li class="header__pages-item">
          <NuxtLink to="/blog" class="header__pages-item-link">Blog</NuxtLink>
        </li>
        <li class="header__pages-item">
          <NuxtLink to="/story" class="header__pages-item-link"
            >Our Story</NuxtLink
          >
        </li>
      </ul>
      <span>|</span>
      <ul class="header__nav-users-list">
        <li class="header__users-item">
          <NuxtLink to="/search" class="header__users-item-link">
            <img src="~/assets/image/icons/Search.svg" alt="Search" />
          </NuxtLink>
        </li>
        <li class="header__users-item">
          <NuxtLink to="/shopcart" class="header__users-item-link">
            <img src="~/assets/image/icons/ShopCart.svg" alt="ShopCart" />
          </NuxtLink>
        </li>
        <li class="header__users-item">
          <NuxtLink to="/profile" class="header__users-item-link">
            <img src="~/assets/image/icons/Profile.svg" alt="Profile" />
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const route = useRoute();
const isHomePage = computed(() => route.path === "/");
</script>

<style lang="scss" scoped>
.header__top {
  display: flex;
  justify-content: space-between;
  padding: 64px 0;
  position: relative;

  &.has-border::after {
    content: "";
    position: absolute;
    bottom: 37px;
    left: 0;
    right: 0;
    height: 1px;
    background: #e0e0e0;
    margin-top: 27px;
    z-index: -1;
  }
  .header__top-nav {
    display: flex;

    gap: 48px;
    @include h5(#000000);
    .header__nav-pages-list {
      display: flex;
      gap: 64px;
      .header__pages-item-link:focus {
        @extend %focus-line;
      }
    }

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
  }
}
</style>
