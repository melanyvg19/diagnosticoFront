import { USER_STATES } from '@utils/Users.util'

const Table = ({ data = [], onEditUser }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
        <tr>
          <th scope="col" className="px-6 py-3">
            Nombre
          </th>

          <th scope="col" className="px-6 py-3">
            Cargo
          </th>

          <th scope="col" className="px-6 py-3">
            Habilitado para diagnóstico
          </th>

          <th scope="col" className="px-6 py-3">
            Rol
          </th>

          <th scope="col" className="px-6 py-3">
            Estado
          </th>

          <th scope="col" className="px-6 py-3">
            Acciones
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map(
          ({
            cargo,
            estadoUsuario,
            formTerminado,
            idUsuario,
            nombreCompleto,
            role,
            username
          }) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={idUsuario}
            >
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="ps-3">
                  <div className="text-base font-semibold">
                    {nombreCompleto}
                  </div>

                  <div className="font-normal text-gray-500 dark:text-gray-400">
                    {username}
                  </div>
                </div>
              </th>

              <td className="px-6 py-4">{cargo}</td>

              <td className="px-6 py-4">
                <div className="flex items-center font-semibold">
                  <div
                    className="h-2.5 w-2.5 rounded-full me-2"
                    style={{
                      background: !formTerminado
                        ? 'var(--active-color)'
                        : 'var(--inactive-color)'
                    }}
                  ></div>

                  {!formTerminado ? 'Sí' : 'No'}
                </div>
              </td>

              <td className="px-6 py-4">{role}</td>

              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div
                    className="h-2.5 w-2.5 rounded-full me-2"
                    style={{
                      background:
                        estadoUsuario === USER_STATES.ACTIVO
                          ? 'var(--active-color)'
                          : 'var(--inactive-color)'
                    }}
                  ></div>

                  {estadoUsuario}
                </div>
              </td>

              <td className="px-6 py-4">
                <button
                  className="py-4 pr-4 font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() =>
                    onEditUser({
                      idUsuario,
                      nombreCompleto,
                      cargo,
                      estadoUsuario,
                      formTerminado,
                      role,
                      username
                    })
                  }
                >
                  Editar usuario
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export { Table }
