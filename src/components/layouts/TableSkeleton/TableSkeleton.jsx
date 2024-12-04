const TableSkeleton = () => {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center w-full gap-12 animate-pulse"
    >
      <article className="w-full bg-gray-300 rounded-md dark:bg-gray-700">
        {/* // ? Skeleton para el buscador */}
        <header className="p-4">
          <div className="w-full max-w-xl mb-4 ml-auto bg-gray-400 rounded-md h-9 dark:bg-gray-500"></div>
        </header>

        {/* // ? Skeleton para la tabla */}
        <article>
          <div className="w-full h-10 bg-gray-400 dark:bg-gray-500"></div>

          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-48 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-36 dark:bg-gray-700"></div>
            <div className="w-56 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-60 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-52 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-44 dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-48 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-36 dark:bg-gray-700"></div>
            <div className="w-56 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-60 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-52 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-44 dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-48 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-36 dark:bg-gray-700"></div>
            <div className="w-56 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-60 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-52 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-44 dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-60 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-52 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-44 dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-48 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-36 dark:bg-gray-700"></div>
            <div className="w-56 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-60 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-52 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-44 dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-60 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-52 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-44 dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-48 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-36 dark:bg-gray-700"></div>
            <div className="w-56 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-60 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-52 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-44 dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-60 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-52 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-44 dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-48 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-36 dark:bg-gray-700"></div>
            <div className="w-56 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center justify-between w-full h-12 gap-4 px-4 bg-gray-400 border-b border-gray-600 dark:bg-gray-800">
            <div className="w-40 h-6 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-60 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-52 dark:bg-gray-700"></div>
            <div className="h-6 bg-gray-300 rounded-md w-44 dark:bg-gray-700"></div>
          </div>
        </article>
      </article>
    </div>
  )
}

export { TableSkeleton }
