// @ts-check
import { defineFlatConfigs } from '@nuxt/eslint-config/flat';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

export default defineFlatConfigs([
  // 1. Базовые настройки Nuxt для TypeScript
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json', // Указывает на ваш tsconfig
      },
    },
  },

  // 2. Ваши кастомные правила
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  // 3. Интеграция с Prettier
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error'],
    },
  },

  // 4. Отключение конфликтующих правил
  configPrettier,
]);
