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
import BurgerMenu from '@/components/BurgerMenu.vue'
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
    display: flex;
    justify-content: space-between;
    padding-top: 48px;
    padding-bottom: 22px;
    position: relative;
    align-items: center;

    @media (max-width: $breakpoints-s) {
        padding-top: 16px;
    }

    .header__top-nav {
        display: flex;
        gap: 48px;
    }

    &.has-border::after {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 0;
        right: 0;
        height: 1px;
        background: #e0e0e0;
        margin-top: 28px;
        z-index: -1;
    }

    .desktop-nav {
        @media (max-width: $breakpoints-l) {
            display: flex;
            align-items: center;
            gap: 16px;
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
            width: 30%;
            height: 100%;
            background: rgba(161, 138, 104, 0.9);
            padding: 108px 10px 40px;
            z-index: 8;
            overflow-y: auto;
            display: flex;
            gap: 20px;

            @media (max-width: $breakpoints-l) {
                flex-direction: column;
            }

            @media (max-width: $breakpoints-s) {
                background-color: #ffffff;
                top: 102px;
                width: 100%;
                padding: 38px 16px 0 18px;
            }

            .header__pages-item {
                @include h3(#000000);
            }

            &-line {
                border: 1px solid #d8d8d8;
                width: 100%;
                height: 1px;
                padding: 0 6px;
            }
        }
    }
}
</style>
