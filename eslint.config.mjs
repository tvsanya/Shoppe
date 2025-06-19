// @ts-check
import nuxtEslintConfig from '@nuxt/eslint-config/flat' // Для Nuxt 3
import prettierConfig from 'eslint-config-prettier'

export default [
  // Базовые настройки Nuxt
  ...nuxtEslintConfig,
  
  // Ваши кастомные правила
  {
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },
  
  // Интеграция с Prettier
  {
    plugins: {
      prettier: await import('eslint-plugin-prettier')
    },
    rules: {
      'prettier/prettier': ['error']
    }
  },
  
  // Отключение конфликтующих правил
  prettierConfig
]