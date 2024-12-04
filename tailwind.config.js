/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '480px'
      },

      colors: {
        'dark-color': 'var(--dark-color)',
        'gray-color': 'var(--gray-color)',

        primary: 'var(--primary-color)',
        'primary-hover': 'var(--primary-hover-color)',
        'primary-disabled': 'var(--primary-disabled)',

        secoundary: 'var(--secoundary-color)',
        'secoundary-hover': 'var(--secoundary-hover-color)',
        'secoundary-disabled': 'var(--secoundary-disabled)',

        terciary: 'var(--terciary-color)',
        'terciary-hover': 'var(--terciary-hover-color)',
        'terciary-disabled': 'var(--terciary-disabled)',

        'red-color': 'var(--red-color)',
        'red-color-dark': 'var(--red-color-dark)',

        'orange-color': 'var(--orange-color)',
        'orange-color-dark': 'var(--orange-color-dark)',

        'yellow-color': 'var(--yellow-color)',
        'yellow-color-dark': 'var(--yellow-color-dark)',

        'green-light-color': 'var(--green-light-color)',
        'green-light-color-dark': 'var(--green-light-color-dark)',

        'green-dark-color': 'var(--green-dark-color)',
        'green-dark-color-dark': 'var(--green-dark-color-dark)'
      }
    }
  },
  plugins: []
}
