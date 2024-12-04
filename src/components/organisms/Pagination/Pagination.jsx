const Pagination = ({
  currentPage,
  isFirst,
  isLast,
  onPageChange,
  totalPages
}) => {
  const handlePreviousPage = () => {
    if (!isFirst) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (!isLast) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <nav
      className="flex flex-wrap items-center justify-between pt-4 flex-column md:flex-row"
      aria-label="Table navigation"
    >
      <span className="block w-full mb-4 text-sm font-normal text-gray-500 dark:text-gray-400 md:mb-0 md:inline md:w-auto">
        Mostrando{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {currentPage + 1}-{totalPages}
        </span>{' '}
        de{' '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalPages}
        </span>
      </span>

      <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
        <li>
          <button
            onClick={handlePreviousPage}
            className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 ms-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-slate-200 disabled:hover:text-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed dark:disabled:hover:bg-gray-600 dark:disabled:hover:text-gray-400 "
            disabled={isFirst}
          >
            Anterior
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i}>
            <button
              onClick={() => onPageChange(i)}
              className={`flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                i === currentPage ? 'bg-gray-200' : ''
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={handleNextPage}
            className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:bg-slate-200 disabled:hover:text-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed dark:disabled:hover:bg-gray-600 dark:disabled:hover:text-gray-400 "
            disabled={isLast}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  )
}

export { Pagination }
