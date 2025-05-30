<template>
  <footer>
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
      <div class="footer__logo">
        <ul class="footer__logo-list">
          <li class="footer__logo-item">
            <NuxtLink to="">
              <img src="/public/icons/Facebook.svg" alt="Facebook" />
            </NuxtLink>
          </li>
          <li class="footer__logo-item">
            <NuxtLink to="">
              <img src="/public/icons/Instagram.svg" alt="Instagram" />
            </NuxtLink>
          </li>
          <li class="footer__logo-item">
            <NuxtLink to="">
              <img src="/public/icons/Twitter.svg" alt="Twitter" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 57px;
  align-items: center;
  .footer__nav {
    @include h5(#707070);
    .footer__nav-list {
      display: flex;
      gap: 41px;
    }
  }
  .footer__discription {
    @include h5(#000000);
    .discription__text {
      span {
        color: #707070;
      }
    }
  }
  .footer__logo {
    .footer__logo-list {
      display: flex;
      gap: 30px;
    }
  }
}
</style>
