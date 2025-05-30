<template>
  <header>
    <div class="header__top" :class="{ 'has-border': !isHomePage }">
      <HeaderLogo />
      <nav class="header__top-nav">
        <NavPageList />
        <span>|</span>
        <NavUserList />
      </nav>
    </div>
  </header>
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
  }
}
</style>
