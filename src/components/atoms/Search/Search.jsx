import { useState, useEffect, useCallback } from 'react'
import { debounce } from '@hooks/debounce'
import { GetSearchUsers } from '@services/Admin/GetSearchUsers.service'

const Search = ({ setUsers }) => {
  const [searchTerm, setSearchTerm] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (term.trim() === '') return

      try {
        const response = await GetSearchUsers(term)

        if (response.success) {
          setUsers(response.data.content)
        }
      } catch (error) {
        console.error('Error fetching searched users:', error)
      }
    }, 450),
    []
  )

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  return (
    <article className="px-2 py-4 bg-white dark:bg-gray-900">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>

      <div className="relative w-full max-w-xl ml-auto">
        <div className="absolute inset-y-0 flex items-center pointer-events-none rtl:inset-r-0 start-0 ps-3">
          <img
            alt="Search icon"
            className="w-4 h-4 dark:invert-[60%]"
            height={16}
            src="/icons/search-icon.svg"
            width={16}
          />
        </div>

        <input
          type="text"
          id="table-search-users"
          className="w-full py-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Busca un usuario"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </article>
  )
}

export { Search }
