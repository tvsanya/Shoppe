<template>
    <form class="footer__form" novalidate @submit.prevent="saveEmail">
        <DefaultInput
            v-model="email"
            type="email"
            name="email"
            placeholder="Give an email, get the newsletter."
            :required="true"
            :message="error || success"
            :variant="success ? 'success' : error ? 'error' : undefined"
            @input="clearMessage"
        />
        <button class="footer__submit-btn" type="submit">
            <ArrowRight />
        </button>
        <span class="footer__form-line" />
        <FormCheckbox
            v-if="isMobile"
            v-model="agreed"
            :error="agreementError"
            label="i agree to the website’s terms and conditions"
        />
    </form>
</template>

<script lang="ts" setup>
    import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
    import DefaultInput from '@/components/DefaultInput.vue'

    const email = ref('')
    const error = ref('')
    const success = ref('')
    const agreed = ref(false)
    const agreementError = ref('')
    const isMobile = ref(false)

    watch(agreed, () => {
        agreementError.value = ''
    })

    const checkMobile = () => {
        isMobile.value = window.innerWidth < 768
    }

    const clearMessage = () => {
        error.value = ''
        success.value = ''
    }

    const validateEmail = () => {
        const value = email.value.trim()

        if (!value) {
            error.value = 'Поле пустое'
            return false
        }

        if (!value.includes('@')) {
            error.value =
                'Адрес электронной почты должен содержать символ «@». Похоже, вы его пропустили.'
            return false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
        if (!emailRegex.test(value)) {
            error.value = 'Пожалуйста, введите действительный адрес электронной почты'
            return false
        }

        return true
    }

    const saveEmail = async () => {
        clearMessage()

        if (isMobile.value && !agreed.value) {
            agreementError.value = 'Вы должны дать согласие на условия использования сайта'
            return
        }
        if (!validateEmail()) return

        try {
            const normalizedEmail: string = email.value.trim().toLowerCase()
            const storedEmails: string[] = JSON.parse(localStorage.getItem('emails') || '[]')

            if (storedEmails.includes(normalizedEmail)) {
                error.value = 'Этот email уже был подписан на рассылку'
                return
            }

            storedEmails.push(normalizedEmail)
            localStorage.setItem('emails', JSON.stringify(storedEmails))

            success.value = 'Спасибо! Вы успешно подписались на рассылку.'
            email.value = ''
            agreed.value = false

            setTimeout(clearMessage, 5000)
        } catch (err) {
            error.value = 'An error occurred. Please try again later.'
            console.error('Subscription error:', err)
        }
    }

    onMounted(() => {
        checkMobile()
        window.addEventListener('resize', checkMobile)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', checkMobile)
    })
</script>

<style lang="scss" scoped>
    .footer__form {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        max-width: 396px;

        @media (max-width: $breakpoints-l) {
            order: 1;
        }

        @media (max-width: $breakpoints-s) {
            max-width: 288px;
        }

        .footer__submit-btn {
            display: flex;
            align-items: center;
            background-color: transparent;
        }

        .footer__form-line {
            width: 396px;
            height: 1px;
            margin-top: 14px;
            border: 1px solid #000000;

            @media (max-width: $breakpoints-s) {
                width: 100%;
            }
        }
    }
</style>
