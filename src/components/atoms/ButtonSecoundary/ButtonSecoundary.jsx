const ButtonSecoundary = ({ isLoading, text, type = 'submit', onClick }) => {
  return (
    <button
      className="flex items-center disabled:cursor-not-allowed disabled:bg-blue-700/60 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      disabled={isLoading}
      onClick={onClick}
      type={type}
    >
      {text}

      {isLoading && <div className="ml-2 loader"></div>}
    </button>
  )
}

export { ButtonSecoundary }
