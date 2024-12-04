import { useEffect, useState } from 'react'
import { GetAllUsers } from '@services/Admin/GetAllUsers.service'
import { Pagination } from '@organisms/Pagination/Pagination'
import { Search } from '@atoms/Search/Search'
import { Table } from '@organisms/Table/Table'
import { TableSkeleton } from '@layouts/TableSkeleton/TableSkeleton'
import { UserModal } from '@organisms/UserModal/UserModal'

const Usuarios = () => {
  const [pageLoading, setPageLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isFirst, setIsFirst] = useState(true)
  const [isLast, setIsLast] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchAllUsers = async (page = 0) => {
      setPageLoading(true)

      try {
        const response = await GetAllUsers(page)

        if (response.success) {
          setUsers(response.data.content)
          setTotalPages(response.data.totalPages)
          setIsFirst(response.data.first)
          setIsLast(response.data.last)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setPageLoading(false)
      }
    }

    fetchAllUsers(currentPage)
  }, [currentPage])

  const openModal = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <>
      {pageLoading && <TableSkeleton />}

      {!pageLoading && (
        <section className="relative shadow-md sm:rounded-lg">
          <Search setUsers={setUsers} />

          <div className="overflow-x-auto">
            {users.length === 0 && (
              <div className="p-2">
                Lo siento, no se encontraron usuarios que coincidan con tu
                búsqueda.
              </div>
            )}

            {users.length !== 0 && (
              <Table data={users} onEditUser={openModal} />
            )}
          </div>

          {isModalOpen && (
            <UserModal
              currentUser={selectedUser}
              onClose={closeModal}
              setSelectedUser={setSelectedUser}
              setUsers={setUsers}
            />
          )}
        </section>
      )}

      <Pagination
        currentPage={currentPage}
        isFirst={isFirst}
        isLast={isLast}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </>
  )
}

export { Usuarios }
