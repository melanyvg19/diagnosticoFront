import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { GetAllSupervisorClients } from '@services/Supervisor/GetAllSupervisorClients.service'
import { GetAllUsersWithoutSupervisor } from '@services/Admin/GetAllUsersWithoutSupervisor.service'
import { PatchDeleteSupervisorClient } from '@services/Admin/PatchDeleteSupervisorClient.service'
import { PatchNewClient } from '@services/Admin/PatchNewClient.service'
import { Select } from '@atoms/Select/Select'

const AssignClients = ({ user }) => {
  const [supervisorClientsLoading, setSupervisorClientsLoading] = useState(true)
  const [supervisorClients, setSupervisorClients] = useState([])
  const [usersWithoutSupervisor, setUsersWithoutSupervisor] = useState([])

  useEffect(() => {
    const fetchUsersWithoutSupervisor = async () => {
      try {
        const response = await GetAllUsersWithoutSupervisor()

        if (response.success) {
          setUsersWithoutSupervisor(response.data)
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsersWithoutSupervisor()
  }, [supervisorClients])

  useEffect(() => {
    const fetchSupervisorClients = async () => {
      try {
        const response = await GetAllSupervisorClients(user.idUsuario)

        if (response.success) {
          setSupervisorClients(response.data)

          setSupervisorClientsLoading(false)
        }
      } catch (error) {
        console.error('Error fetching supervisor clients:', error)
      }
    }

    fetchSupervisorClients()
  }, [user.idUsuario])

  const deleteSupervisorUser = async (idUsuario) => {
    setSupervisorClients(
      supervisorClients.filter((user) => user.idUsuario !== idUsuario)
    )

    const result = await PatchDeleteSupervisorClient(user.idUsuario, [
      idUsuario
    ])

    if (!result.success) {
      toast.error(
        `Ocurrió un error al eliminar el cliente ${user.nombreCompleto} del supervisor actual`
      )
      setSupervisorClients([...supervisorClients])
    }
  }

  const addUserToSupervisor = async (event) => {
    const userId = Number(event.target.value)
    const selectedUser = usersWithoutSupervisor.find(
      (user) => user.idUsuario === userId
    )

    if (selectedUser) {
      setSupervisorClients([...supervisorClients, selectedUser])
      setUsersWithoutSupervisor(
        usersWithoutSupervisor.filter((user) => user.idUsuario !== userId)
      )

      const result = await PatchNewClient(user.idUsuario, [userId])

      if (!result.success) {
        toast.error(
          `Ocurrió un error al asignar el cliente ${user.nombreCompleto} al supervisor actual`
        )
        setSupervisorClients(
          supervisorClients.filter((user) => user.idUsuario !== userId)
        )
        setUsersWithoutSupervisor([...usersWithoutSupervisor])
      }
    }
  }

  return (
    <div className="col-span-6">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="clientes"
      >
        Clientes actuales del supervisor:{' '}
        <span className="underline">{user.nombreCompleto}</span>
      </label>

      {supervisorClientsLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Cargando clientes...
        </p>
      )}

      {!supervisorClientsLoading && supervisorClients.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Este supervisor no tiene clientes asignados.
        </p>
      )}

      <ul className="flex flex-wrap gap-2 mb-4">
        {!supervisorClientsLoading &&
          supervisorClients.map(({ idUsuario, nombreCompleto, username }) => (
            <li
              className="relative p-1 text-xs text-white rounded-sm group bg-primary"
              key={idUsuario}
            >
              {nombreCompleto} - {username}
              <button
                className="absolute right-0 items-center justify-center hidden h-full px-1 text-sm text-white -translate-y-1/2 bg-primary top-1/2 group-hover:inline-flex w-fit"
                onClick={() => deleteSupervisorUser(idUsuario)}
                type="button"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </li>
          ))}
      </ul>

      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="clientes"
      >
        Asignar clientes
      </label>

      <Select
        defaultOption="Selecciona un cliente"
        id="clientes"
        name="clientes"
        onChange={addUserToSupervisor}
        value="Selecciona un cliente"
      >
        {usersWithoutSupervisor.map(
          ({ idUsuario, nombreCompleto, username }) => (
            <option key={idUsuario} value={idUsuario}>
              {nombreCompleto} - {username}
            </option>
          )
        )}
      </Select>
    </div>
  )
}

export { AssignClients }
