<template>
    <footer class="footer">
        <div class="footer__line" />
        <div class="footer__container">
            <nav class="footer__nav">
                <FooterNavList />
            </nav>
            <FooterForm />
            <FooterDiscript />
            <FooterLogoList />
        </div>
    </footer>
</template>

<script lang="ts" setup>
import FooterNavList from '@/components/FooterNavList.vue'
import FooterLogoList from '@/components/FooterLogoList.vue'
import FooterDiscript from '@/components/FooterDiscript.vue'
</script>

<style lang="scss" scoped>
.footer {
    position: relative;

    &__line {
        height: 1px;
        background: #e0e0e0;
        margin-bottom: 52px;
        margin-top: 252px;
        z-index: -1;
    }

    &__container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 58px;
        align-items: center;
        position: relative;

        @media (max-width: $breakpoints-m) {
            flex-direction: column;
            align-items: normal;
            gap: 36px;
        }

        .footer__nav {
            @media (max-width: $breakpoints-l) {
                order: 2;
            }
        }
    }
}
</style>
