const ButtonQuaternary = ({ isLoading, text, type = 'submit', onClick }) => {
  return (
    <button
      className="flex items-center disabled:cursor-not-allowed hover:bg-black transition-colors hover:text-white focus:ring-4 focus:outline-none focus:ring-black/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-2 disabled:hover:bg-white disabled:hover:text-black border-black"
      disabled={isLoading}
      onClick={onClick}
      type={type}
    >
      {text}

      {isLoading && <div className="ml-2 dark-loader"></div>}
    </button>
  )
}

export { ButtonQuaternary }
