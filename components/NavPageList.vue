<template>
    <ul class="header__nav-pages-list" :class="`header__nav-pages-list--${showAs}`">
        <li v-for="(item, index) in visibleItems" :key="index" class="header__pages-item">
            <NuxtLink :to="item.path" class="header__pages-item-link" @click="handleClick">{{
                item.title
            }}</NuxtLink>
        </li>
    </ul>
</template>

<script setup>
const props = defineProps({
    showAs: {
        type: String,
        default: 'desktop',
        validator: (value) => ['desktop', 'mobile'].includes(value),
    },
})
const NavPageItems = [
    { path: '/', title: 'Home', showIn: ['mobile'] },
    { path: '/shop', title: 'Shop', showIn: ['desktop', 'mobile'] },
    { path: '/about', title: 'About', showIn: ['mobile'] },
    { path: '/blog', title: 'Blog', showIn: ['desktop', 'mobile'] },
    { path: '/about', title: 'Our Story', showIn: ['desktop'] },
    { path: '/', title: 'Help', showIn: ['mobile'] },
    { path: '/', title: 'Contact', showIn: ['mobile'] },
    { path: '/', title: 'Search', showIn: ['mobile'] },
].map((item) => ({
    ...item,
    showIn: item.showIn || [],
}))

const visibleItems = computed(() => {
    return NavPageItems.filter((item) => item.showIn.includes(props.showAs))
})

const handleClick = () => {
    if (props.showAs === 'mobile') {
        emit('click')
    }
}
</script>

<style lang="scss" scoped>
.header__nav-pages-list--desktop {
    display: flex;
    gap: 64px;

    @media (max-width: $breakpoints-l) {
        display: none;
    }
    .header__pages-item-link {
        @include h5(#000000);

        &:focus {
            @extend %focus-line;
        }
    }
}
.header__nav-pages-list--mobile {
    @media (max-width: $breakpoints-l) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
    }

    .header__pages-item {
        @include h5(#000000);

        @media (max-width: $breakpoints-l) {
            &:hover {
                color: #ffffff;
            }
        }
        @media (max-width: $breakpoints-s) {
            transition: all 0.3s;

            &:hover {
                transform: scale(1.1);
                color: #000000;
            }
        }
    }
}
</style>
