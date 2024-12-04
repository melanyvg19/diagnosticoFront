import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import { ROLES } from '@utils/rolesPermissions.util'

const ProtectedAuth = () => {
  const token = Cookies.get('accessToken')
  const userRole = Cookies.get('userRole')

  if (token && userRole !== ROLES.SUPERVISOR) {
    return <Navigate to="/inicio" />
  } else if (token && userRole === ROLES.SUPERVISOR) {
    return <Navigate to="/indicadores" />
  }

  return <Outlet />
}

export { ProtectedAuth }
