<template>
    <ul class="footer__nav-list">
        <li v-for="(item, index) in navItems" :key="index" class="footer__nav-item">
            {{ item }}
        </li>
    </ul>
</template>

<script setup>
    const navItems = ['CONTACT', 'TERMS OF SERVICES', 'SHIPPING AND RETURNS']
</script>

<style lang="scss" scoped>
    .footer__nav-list {
        display: flex;
        gap: 42px;

        @media (max-width: $breakpoints-m) {
            flex-direction: column;
            gap: 8px;
        }

        .footer__nav-item {
            @include h5(#707070);
        }
    }
</style>
