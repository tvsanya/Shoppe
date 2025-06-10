<template>
  <footer class="footer">
    <div class="footer__line"></div>
    <div class="footer__container">
      <nav class="footer__nav">
        <ul class="footer__nav-list">
          <li class="footer__nav-item">CONTACT</li>
          <li class="footer__nav-item">TERMS OF SERVICES</li>
          <li class="footer__nav-item">SHIPPING AND RETURNS</li>
        </ul>
      </nav>
      <FooterForm />
      <div class="footer__discription">
        <p class="discription__text">
          © 2021 Shelly. <span>Terms of use</span> and
          <span>privacy policy.</span>
        </p>
      </div>
      <ul class="footer__logo-list">
        <div class="logo__discription">
          <p class="logo__text">Follow us</p>
          <span class="logo__line"></span>
        </div>
        <li
          v-for="(item, index) in FooterLinks"
          :key="index"
          class="footer__logo-item"
        >
          <NuxtLink :to="item.path">
            <img :src="item.src" :alt="item.alt" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script lang="ts" setup>
interface SocialLink {
  path: string;
  src: string;
  alt: string;
}

const FooterLinks: SocialLink[] = [
  { path: "/search", src: "/icons/Facebook.svg", alt: "Facebook" },
  { path: "/shopcart", src: "/icons/Instagram.svg", alt: "Instagram" },
  { path: "/profile", src: "/icons/Twitter.svg", alt: "Twitter" },
];
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  .footer__line {
    height: 1px;
    background: #e0e0e0;
    margin-bottom: 52px;
    margin-top: 252px;
    z-index: -1;
  }
  .footer__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 58px;
    align-items: center;
    position: relative;
    .footer__nav {
      &-list {
        display: flex;
        gap: 42px;
        .footer__nav-item {
          @include h5(#707070);
        }
      }
    }
    .footer__discription {
      .discription__text {
        @include h5(#000000);
        span {
          color: #707070;
        }
      }
    }
    .footer__logo-list {
      display: flex;
      gap: 30px;
      .logo__discription {
        display: none;
        align-items: center;
        gap: 14px;
        .logo__text {
          @include body_small(#000000);
        }
        .logo__line {
          border: 1px #000000 solid;
          width: 48px;
        }
      }
    }
  }
}
@media (max-width: $breakpoints-l) {
  .footer__nav {
    order: 2;
  }
  .footer__form {
    order: 1;
  }
  .footer__discription {
    order: 4;
  }
  .footer__logo-list {
    order: 3;
  }
}
@media (max-width: $breakpoints-m) {
  .footer {
    .footer__container {
      flex-direction: column;
      align-items: normal;
      gap: 36px;
      .footer__nav {
        .footer__nav-list {
          flex-direction: column;
          gap: 8px;
        }
      }
      .footer__discription {
        .discription__text {
          font-size: 12px;
          color: #707070;
        }
      }
      .footer__logo-list {
        gap: 16px;
        .logo__discription {
          display: flex;
        }
      }
    }
  }
}
</style>
