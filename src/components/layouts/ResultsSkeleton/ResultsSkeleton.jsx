import './ResultsSkeleton.css'

const ResultsSkeleton = () => {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center w-full gap-6 animate-pulse"
    >
      {/* // ? Skeleton para la gráfica */}
      <article className="w-full max-w-xl">
        <div className="w-64 h-8 mx-auto mb-4 bg-gray-300 rounded-md dark:bg-gray-700"></div>
        <div className="w-40 h-8 mx-auto mb-4 bg-gray-300 rounded-md dark:bg-gray-700"></div>

        <div className="w-full h-32 mx-auto mb-4 bg-gray-300 rounded-md dark:bg-gray-700"></div>

        <div className="w-40 h-8 mx-auto mt-10 bg-gray-300 rounded-md dark:bg-gray-700"></div>
        <div className="mx-auto my-8 bg-gray-300 max-w-96 aspect-square min-w-32 dark:bg-gray-700 clip-pentagon"></div>
      </article>

      {/* // ? Skeleton para los párrafos y la tabla */}
      <article className="flex flex-col justify-between w-full max-w-xl">
        <div className="w-56 h-8 mx-auto mb-4 bg-gray-300 rounded-md dark:bg-gray-700"></div>

        <div className="flex items-center justify-center gap-12 mt-4">
          <div className="h-[400px] w-44 bg-gray-300 rounded-full dark:bg-gray-700"></div>

          {/* // ? Skeleton para los párrafos */}
          <div className="flex flex-col w-full h-[400px] justify-evenly">
            <div className="w-full h-8 mx-auto mb-4 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="w-full h-8 mx-auto mb-4 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="w-full h-8 mx-auto mb-4 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="w-full h-8 mx-auto mb-4 bg-gray-300 rounded-md dark:bg-gray-700"></div>
            <div className="w-full h-8 mx-auto mb-4 bg-gray-300 rounded-md dark:bg-gray-700"></div>
          </div>
        </div>
      </article>
    </div>
  )
}

export { ResultsSkeleton }
