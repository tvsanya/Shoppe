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
    <span class="footer__form-line"></span>
    <FormCheckbox
      v-if="isMobile"
      v-model="agreed"
      :error="agreementError"
      label="i agree to the website’s terms and conditions"
    />
  </form>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import DefaultInput from "@/components/DefaultInput.vue";

type Email = string;
type ErrorMessage = string;
type SuccessMessage = string;
type StoredEmails = Email[];
type Agreed = boolean;
type AgreementError = string;

const email = ref<Email>("");
const error = ref<ErrorMessage>("");
const success = ref<SuccessMessage>("");
const agreed = ref<Agreed>(false);
const agreementError = ref<AgreementError>("");
const isMobile = ref(false);

watch(agreed, (newValue) => {
  agreementError.value = "";
});

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
});

const clearMessage = (): void => {
  error.value = "";
  success.value = "";
};

const validateEmail = (): boolean => {
  if (!email.value) {
    error.value = "Поле пустое";
    return false;
  }

  if (!email.value.includes("@")) {
    error.value =
      "Адрес электронной почты должен содержать символ «@». Похоже, вы его пропустили.";
    return false;
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!regex.test(email.value)) {
    error.value = "Пожалуйста, введите действительный адрес электронной почты";
    return false;
  }

  return true;
};

const saveEmail = (): void => {
  error.value = "";
  agreementError.value = "";
  success.value = "";

  if (isMobile.value && !agreed.value) {
    agreementError.value =
      "Вы должны дать согласие на условия использования сайта";
    return;
  }

  if (!validateEmail()) return;

  try {
    const normalizedEmail: Email = email.value.trim().toLowerCase();
    const storedEmails: StoredEmails = JSON.parse(
      localStorage.getItem("Emails") || "[]"
    );

    if (storedEmails.some((e: Email) => e.toLowerCase() === normalizedEmail)) {
      error.value = "Этот email уже был подписан на рассылку";
      return;
    }

    storedEmails.push(normalizedEmail);
    localStorage.setItem("Emails", JSON.stringify(storedEmails));

    success.value = "Спасибо! Вы успешно подписались на рассылку.";
    email.value = "";
    if (isMobile.value) {
      agreed.value = false;
    }

    setTimeout(() => {
      success.value = "";
    }, 5000);
  } catch (err) {
    error.value = "Произошла ошибка. Пожалуйста, попробуйте позже.";
    console.error("Ошибка при сохранении email:", err);
  }
};
</script>

<style lang="scss" scoped>
.footer__form {
  @include h5(#707070);
  display: flex;
  max-width: 396px;
  flex-wrap: wrap;
  position: relative;
  .footer__submit-btn {
    background-color: transparent;
    display: flex;
    align-items: center;
  }
  .footer__form-line {
    border: 1px solid #000000;
    width: 396px;
    height: 1px;
    margin-top: 14px;
  }
}
@media (max-width: $breakpoints-s) {
  .footer__form {
    max-width: 288px;
    .footer__form-line {
      width: 100%;
    }
  }
}
</style>
