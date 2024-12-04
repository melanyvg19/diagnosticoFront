const FormsSkeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      {/* // ? Skeleton para el banner de la imagen */}
      <div className="h-[400px] mb-8 bg-gray-300 rounded-md dark:bg-gray-700"></div>

      {/* // ? Primer skeleton */}
      <div className="h-6 bg-gray-300 rounded-md dark:bg-gray-700 max-w-3xl mb-2.5"></div>

      <div className="h-5 max-w-xl bg-gray-300 rounded-md dark:bg-gray-700"></div>

      <div className="flex items-center gap-3 my-4">
        <div className="w-20 h-12 bg-gray-200 rounded-md dark:bg-gray-700"></div>

        <div className="w-20 h-12 bg-gray-200 rounded-md dark:bg-gray-700"></div>
      </div>

      {/* // ? Segundo skeleton */}
      <div className="h-6 bg-gray-300 rounded-md dark:bg-gray-700 max-w-3xl mb-2.5"></div>

      <div className="h-5 max-w-xl bg-gray-300 rounded-md dark:bg-gray-700"></div>

      <div className="flex items-center gap-3 my-4">
        <div className="w-20 h-12 bg-gray-200 rounded-md dark:bg-gray-700"></div>

        <div className="w-20 h-12 bg-gray-200 rounded-md dark:bg-gray-700"></div>
      </div>

      {/* // ? Tercer skeleton */}
      <div className="h-6 bg-gray-300 rounded-md dark:bg-gray-700 max-w-3xl mb-2.5"></div>

      <div className="h-5 max-w-xl bg-gray-300 rounded-md dark:bg-gray-700"></div>

      <div className="my-4">
        <div className="h-12 max-w-2xl my-4 bg-gray-200 rounded-md dark:bg-gray-700"></div>

        <div className="h-12 max-w-2xl my-4 bg-gray-200 rounded-md dark:bg-gray-700"></div>
      </div>

      {/* // ? Cuarto skeleton */}
      <div className="h-6 bg-gray-300 rounded-md dark:bg-gray-700 max-w-3xl mb-2.5"></div>

      <div className="h-5 max-w-xl bg-gray-300 rounded-md dark:bg-gray-700"></div>

      <div className="my-4">
        <div className="h-12 max-w-2xl my-4 bg-gray-200 rounded-md dark:bg-gray-700"></div>

        <div className="h-12 max-w-2xl my-4 bg-gray-200 rounded-md dark:bg-gray-700"></div>
      </div>
    </div>
  )
}

export { FormsSkeleton }
