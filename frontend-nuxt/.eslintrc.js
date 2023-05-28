module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    '@nuxt/eslint-config'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: ['./node_modules/*']
}
