<template>
  <form class="footer__form" novalidate @submit.prevent="saveEmail">
    <input
      v-model="email"
      type="email"
      name="email"
      placeholder="Give an email, get the newsletter."
      required
      @input="clearMessage"
    />
    <EmailError v-if="error" :message="error" />
    <EmailSuccess v-if="success" :message="success" />
    <button class="form__submit" type="submit">
      <img src="/public/icons/arrow-right.svg" alt="" />
    </button>
    <span class="form_line"></span>
  </form>
</template>

<script setup>
import { ref } from "vue";
import EmailError from "./EmailError.vue";
import EmailSuccess from "./EmailSuccess.vue";

const email = ref("");
const error = ref("");
const success = ref("");

const clearMessage = () => {
  error.value = "";
  success.value = "";
};
const validateEmail = () => {
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

const saveEmail = () => {
  if (!validateEmail()) return;
  try {
    const normalizedEmail = email.value.trim().toLowerCase();
    const storedEmails = JSON.parse(localStorage.getItem("Emails")) || [];

    if (storedEmails.some((e) => e.toLowerCase() === normalizedEmail)) {
      error.value = "Этот email уже был подписан на рассылку";
      return;
    }

    storedEmails.push(normalizedEmail);
    localStorage.setItem("Emails", JSON.stringify(storedEmails));

    success.value = "Спасибо! Вы успешно подписались на рассылку.";
    email.value = "";
    error.value = "";
    setTimeout(() => {
      success.value = "";
    }, 5000);
  } catch (error) {
    error.value = "Произошла ошибка. Пожалуйста, попробуйте позже.";
  }
};
</script>

<style lang="scss" scoped>
.footer__form {
  display: flex;
  max-width: 396px;
  flex-wrap: wrap;
  position: relative;
  @include h5(#707070);
  input {
    width: 371px;
  }
  .input__message {
    position: absolute;
    top: 100%;
    left: 0;
    font-size: 12px;
    margin-top: 5px;
    font-style: $font-family;
    font-size: 14px;
    transition: all 0.3s;
  }

  .form__submit {
    background-color: transparent;
    display: flex;
    align-items: center;
  }
  .form_line {
    border: 1px solid #000000;
    width: 396px;
    height: 1px;
    margin-top: 13px;
  }
}
</style>
