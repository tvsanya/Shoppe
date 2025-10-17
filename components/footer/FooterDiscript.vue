<template>
    <div class="footer__discription">
        <p class="discription__text">
            © 2021 Shelly. <span>Terms of use</span> and
            <span>privacy policy.</span>
        </p>
    </div>
</template>

<style lang="scss" scoped>
    .footer__discription {
        @media (max-width: $breakpoints-l) {
            order: 4;
        }

        .discription__text {
            @include h5(#000000);

            @media (max-width: $breakpoints-m) {
                font-size: 12px;
                color: #707070;
            }

            span {
                color: #707070;
            }
        }
    }
</style>
