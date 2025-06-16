<template>
    <ul class="footer__logo-list">
        <div class="logo__discription">
            <p class="logo__text">Follow us</p>
            <span class="logo__line" />
        </div>
        <li v-for="(item, index) in FooterLinks" :key="index" class="footer__logo-item">
            <NuxtLink :to="item.path">
                <img :src="item.icon" :alt="item.alt" />
            </NuxtLink>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import Facebook from '@/public/icons/Facebook.svg'
import Instagram from '@/public/icons/Instagram.svg'
import Twitter from '@/public/icons/Twitter.svg'

interface SocialLink {
    path: string
    icon: string
    alt: string
}

const FooterLinks: SocialLink[] = [
    { path: '/', icon: Facebook, alt: 'Facebook' },
    { path: '/', icon: Instagram, alt: 'Instagram' },
    { path: '/', icon: Twitter, alt: 'Twitter' },
]
</script>

<style lang="scss" scoped>
.footer__logo-list {
    display: flex;
    gap: 30px;

    @media (max-width: $breakpoints-l) {
        order: 3;
    }

    @media (max-width: $breakpoints-m) {
        gap: 16px;
    }

    .logo__discription {
        display: none;

        @media (max-width: $breakpoints-m) {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        .logo__text {
            @include body_small(#000000);
        }

        .logo__line {
            border: 1px #000000 solid;
            width: 48px;
        }
    }
}
</style>
