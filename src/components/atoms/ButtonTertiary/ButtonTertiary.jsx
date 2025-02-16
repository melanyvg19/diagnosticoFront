const ButtonTertiary = ({ onClick, isLoading, text, type = 'submit' }) => {
  return (
    <button
      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
      disabled={isLoading}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  )
}

export { ButtonTertiary }
