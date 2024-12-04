import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import { hasPermission } from '@utils/rolesPermissions.util'

const ProtectedRoute = ({ allowedRoles = [], permission }) => {
  const token = Cookies.get('accessToken')
  const userRole = Cookies.get('userRole')

  // ? Validación en caso de que no tenga token
  if (!token) {
    return <Navigate to="/" />
  }

  // ? Validación para las rutas que solo deben ver ciertos roles
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />
  }

  // ? Validación para las rutas que solo deben ver ciertos roles
  if (permission && !hasPermission(userRole, permission)) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export { ProtectedRoute }
