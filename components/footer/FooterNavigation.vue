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
    import FooterNavList from '@/components/footer/FooterNavList.vue'
    import FooterLogoList from '@/components/footer/FooterLogoList.vue'
    import FooterDiscript from '@/components/footer/FooterDiscript.vue'
</script>

<style lang="scss" scoped>
    .footer {
        position: relative;

        @media (max-width: $breakpoints-m) {
            margin-top: 108px;
        }

        @media (max-width: $breakpoints-s) {
            margin-top: 94px;
        }

        &__line {
            z-index: -1;
            height: 1px;
            margin-top: 252px;
            margin-bottom: 52px;
            background: #e0e0e0;

            @media (max-width: $breakpoints-l) {
                margin-top: 182px;
            }

            @media (max-width: $breakpoints-m) {
                display: none;
            }
        }

        &__container {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            gap: 58px;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 80px;

            @media (max-width: $breakpoints-m) {
                flex-direction: column;
                gap: 36px;
                align-items: normal;
            }

            .footer__nav {
                @media (max-width: $breakpoints-l) {
                    order: 2;
                }
            }
        }
    }
</style>
