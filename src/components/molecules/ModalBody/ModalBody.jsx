import { AssignClients } from '@molecules/AssignClients/AssignClients'
import { CheckboxRadio } from '@atoms/CheckboxRadio/CheckboxRadio'
import { InputGroup } from '@layouts/InputGroup/InputGroup'
import { ROLES } from '@utils/rolesPermissions.util'

const ModalBody = ({ user, handleChange }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6">
          <label
            htmlFor="estadoUsuario"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Estado
          </label>

          <InputGroup>
            <CheckboxRadio
              checked={user.estadoUsuario === 'Activo'}
              id="estadoActivo"
              name="estadoUsuario"
              onChange={handleChange}
              text="Activo"
              type="radio"
              value="Activo"
            />

            <CheckboxRadio
              checked={user.estadoUsuario === 'Inactivo'}
              id="estadoInactivo"
              name="estadoUsuario"
              onChange={handleChange}
              text="Inactivo"
              type="radio"
              value="Inactivo"
            />
          </InputGroup>
        </div>

        <div className="col-span-6">
          <label
            htmlFor="rolUsuario"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Rol
          </label>

          <InputGroup>
            <CheckboxRadio
              checked={user.role === ROLES.ADMIN}
              id="admin"
              name="role"
              onChange={handleChange}
              text="Administrador"
              type="radio"
              value={ROLES.ADMIN}
            />

            <CheckboxRadio
              checked={user.role === ROLES.SUPERVISOR}
              id="supervisor"
              name="role"
              onChange={handleChange}
              text="Supervisor"
              type="radio"
              value={ROLES.SUPERVISOR}
            />

            <CheckboxRadio
              checked={user.role === ROLES.CLIENTE}
              id="cliente"
              name="role"
              onChange={handleChange}
              text="Cliente"
              type="radio"
              value={ROLES.CLIENTE}
            />
          </InputGroup>
        </div>

        <div className="col-span-6">
          <label
            htmlFor="ableToDiagnostic"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Habilitado para diagnóstico
          </label>

          <InputGroup>
            <CheckboxRadio
              checked={user.formTerminado === false}
              id="formTerminadoFalse"
              name="formTerminado"
              onChange={handleChange}
              text="Sí"
              type="radio"
              value={false}
            />

            <CheckboxRadio
              checked={user.formTerminado === true}
              id="formTerminadoTrue"
              name="formTerminado"
              onChange={handleChange}
              text="No"
              type="radio"
              value={true}
            />
          </InputGroup>
        </div>

        {user.role === ROLES.SUPERVISOR && <AssignClients user={user} />}
      </div>
    </div>
  )
}

export { ModalBody }
