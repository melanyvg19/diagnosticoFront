import { useState } from 'react'
import { toast } from 'react-toastify'
import { ModalBody } from '@molecules/ModalBody/ModalBody'
import { ModalFooter } from '@molecules/ModalFooter/ModalFooter'
import { ModalHeader } from '@molecules/ModalHeader/ModalHeader'
import { PatchUserStates } from '@services/Admin/PatchUserStates.service'

const UserModal = ({ currentUser, onClose, setSelectedUser, setUsers }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    const actualValue = type === 'checkbox' ? checked : value

    setSelectedUser((prevValues) => ({
      ...prevValues,
      [name]:
        type === 'radio' && name === 'formTerminado'
          ? JSON.parse(actualValue)
          : actualValue
    }))
  }

  const updateUserState = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await PatchUserStates(currentUser.idUsuario, currentUser)

      if (result.success) {
        const { data } = result
        toast.success('Usuario editado con éxito')

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.idUsuario === data.idUsuario ? data : user
          )
        )
      }
    } catch (error) {
      console.error('Error updating user state:', error)
      toast.error('Hubo un error al editar el usuario')
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  return (
    <article
      aria-hidden="true"
      className="fixed inset-0 z-50 items-center justify-center min-h-screen p-4 overflow-x-hidden overflow-y-auto bg-gray-900/40"
      id="editUserModal"
      tabIndex="-1"
    >
      <form
        onSubmit={updateUserState}
        className="relative max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow top-1/2 left-1/2 dark:bg-gray-700"
      >
        <ModalHeader onClose={onClose} />

        <ModalBody user={currentUser} handleChange={handleChange} />

        <ModalFooter onClose={onClose} isLoading={isLoading} />
      </form>
    </article>
  )
}

export { UserModal }
