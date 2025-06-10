<template>
  <header>
    <div class="header__top" :class="{ 'has-border': !isHomePage }">
      <HeaderLogo />
      <nav class="header__top-nav desktop-nav">
        <NavPageList show-as="desktop" />
        <span>|</span>
        <NavUserList show-as="desktop" @open-search="showSearch = true" />
        <div class="mobile-menu">
          <BurgerMenu :isOpen="isMenuOpen" @toggle="toggleMenu" />
          <nav v-show="isMenuOpen" class="mobile-nav">
            <NavPageList show-as="mobile" @click="closeMenu" />
            <div class="mobile-nav-line"></div>
            <NavUserList show-as="mobile" @click="closeMenu" />
          </nav>
        </div>
      </nav>
    </div>
  </header>
  <SearchPopup
    :is-open="showSearch"
    :is-mobile="isMobile"
    @close="showSearch = false"
  />
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import BurgerMenu from "@/components/BurgerMenu.vue";

const route = useRoute();
const isMenuOpen = ref(false);
const isMobile = ref(false);
const showSearch = ref(false);

const isHomePage = computed(() => route.path === "/");

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? "hidden" : "";
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};
</script>

<style lang="scss" scoped>
.header__top {
  display: flex;
  justify-content: space-between;
  padding-top: 64px;
  padding-bottom: 22px;
  position: relative;
  align-items: center;

  &.has-border::after {
    content: "";
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    height: 1px;
    background: #e0e0e0;
    margin-top: 28px;
    z-index: -1;
  }
  .header__top-nav {
    @include h5(#000000);
    display: flex;
    gap: 48px;
  }
  .mobile-menu {
    display: none;
    @include h3(#000000);
    .mobile-nav {
      position: fixed;
      top: 0;
      right: 0;
      width: 30%;
      height: 100%;
      background: rgba(94, 93, 93, 0.7);
      padding: 108px 10px 40px;
      z-index: 99;
      overflow-y: auto;
      display: flex;
      gap: 20px;
      &-line {
        border: 1px solid #d8d8d8;
        width: 100%;
        height: 1px;
        padding: 0 6px;
      }
    }
  }
}
@media (max-width: $breakpoints-l) {
  .header__top {
    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 16px;
      span {
        display: none;
      }
    }
    .mobile-menu {
      display: flex;
      .mobile-nav {
        flex-direction: column;
      }
    }
  }
}
@media (max-width: $breakpoints-s) {
  .header__top {
    .mobile-menu {
      .mobile-nav {
        background-color: #ffffff;
        top: 148px;
        width: 100%;
        padding: 38px 16px 0 18px;
      }
    }
  }
}
</style>
