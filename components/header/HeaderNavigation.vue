<!-- eslint-disable vue/attribute-hyphenation -->
<template>
    <header>
        <div class="header__top" :class="{ 'has-border': !isHomePage }">
            <HeaderLogo />
            <nav class="header__top-nav desktop-nav">
                <NavPageList showAs="desktop" />
                <span>|</span>
                <NavUserList showAs="desktop" @open-search="showSearch = true" />
                <div class="mobile-menu">
                    <BurgerMenu :is-open="isMenuOpen" @toggle="toggleMenu" />
                    <nav v-show="isMenuOpen" class="mobile-nav">
                        <NavPageList showAs="mobile" @click="closeMenu" />
                        <div class="mobile-nav-line" />
                        <NavUserList showAs="mobile" @click="closeMenu" />
                    </nav>
                </div>
            </nav>
        </div>
    </header>
    <SearchPopup v-if="shouldShowSearch" :is-mobile="isMobile" @close="showSearch = false" />
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue'
    import { useRoute } from 'vue-router'
    import BurgerMenu from '@/components/header/BurgerMenu.vue'
    import { useMobile } from '@/composables/useMobile'

    const route = useRoute()
    const isMenuOpen = ref(false)
    const showSearch = ref(false)
    const { isMobile } = useMobile()

    const isHomePage = computed(() => route.path === '/')
    const shouldShowSearch = computed(() => isMobile.value || showSearch.value)

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
        document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
    }

    const closeMenu = () => {
        isMenuOpen.value = false
        document.body.style.overflow = ''
    }
</script>

<style lang="scss" scoped>
    .header__top {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 48px;
        padding-bottom: 22px;

        @media (max-width: $breakpoints-s) {
            padding-top: 16px;
        }

        .header__top-nav {
            display: flex;
            gap: 48px;
        }

        &.has-border::after {
            position: absolute;
            right: 0;
            bottom: 4px;
            left: 0;
            z-index: -1;
            height: 1px;
            margin-top: 28px;
            content: '';
            background: #e0e0e0;
        }

        .desktop-nav {
            @media (max-width: $breakpoints-l) {
                display: flex;
                gap: 16px;
                align-items: center;
            }

            span {
                @media (max-width: $breakpoints-l) {
                    display: none;
                }
            }
        }

        .mobile-menu {
            display: none;

            @media (max-width: $breakpoints-l) {
                display: flex;
            }

            .mobile-nav {
                position: fixed;
                top: 0;
                right: 0;
                z-index: 8;
                display: flex;
                gap: 20px;
                width: 30%;
                height: 100%;
                padding: 108px 10px 40px;
                overflow-y: auto;
                background: rgba(161, 138, 104, 0.9);

                @media (max-width: $breakpoints-l) {
                    flex-direction: column;
                }

                @media (max-width: $breakpoints-s) {
                    top: 102px;
                    width: 100%;
                    padding: 38px 16px 0 18px;
                    background-color: #ffffff;
                }

                .header__pages-item {
                    @include h3(#000000);
                }

                &-line {
                    width: 100%;
                    height: 1px;
                    padding: 0 6px;
                    border: 1px solid #d8d8d8;
                }
            }
        }
    }
</style>
