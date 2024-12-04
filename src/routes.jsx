import { createBrowserRouter } from 'react-router-dom'

import { ErrorPage } from '@pages/ErrorPage/ErrorPage'
import { FormsMadurezDigital } from '@pages/FormsMadurezDigital/FormsMadurezDigital.jsx'
import { Glosario } from '@pages/Glosario/Glosario.jsx'
import { Indicadores } from '@pages/Indicadores/Indicadores'
import { Layout } from '@src/Layout.jsx'
import { Login } from '@pages/Auth/Login/Login.jsx'
import { NotFound404 } from '@pages/NotFound404/NotFound404.jsx'
import { ProtectedAuth } from '@layouts/ProtectedAuth/ProtectedAuth'
import { ProtectedRoute } from '@layouts/ProtectedRoute/ProtectedRoute.jsx'
import { Register } from '@pages/Auth/Register/Register.jsx'
import { Resultados } from '@pages/Resultados/Resultados'
import { ROLES } from '@utils/rolesPermissions.util'
import { Usuarios } from '@pages/Usuarios/Usuarios'

export const router = createBrowserRouter([
  {
    path: '',
    element: <ProtectedAuth />,
    children: [
      {
        path: '',
        element: <Login />,
        errorElement: <NotFound404 />
      },
      {
        path: 'register',
        element: <Register />,
        errorElement: <NotFound404 />
      }
    ],
    errorElement: <ErrorPage />
  },

  // ? Rutas para el ADMIN y el Cliente
  {
    path: '',
    element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.CLIENTE]} />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            path: 'inicio',
            element: <Glosario />
          },
          {
            path: 'nivel-madurez-digital',
            element: <FormsMadurezDigital />
          },
          {
            path: 'resultados',
            element: <Resultados />
          }
        ]
      }
    ],
    errorElement: <ErrorPage />
  },

  // ? Rutas para el ADMIN y el Supervisor
  {
    path: 'indicadores',
    element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPERVISOR]} />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <Indicadores />
          }
        ]
      }
    ],
    errorElement: <ErrorPage />
  },

  // ? Rutas para el ADMIN
  {
    path: '',
    element: <ProtectedRoute allowedRoles={[ROLES.ADMIN]} />,
    children: [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            path: 'usuarios',
            element: <Usuarios />
          }
        ]
      }
    ],
    errorElement: <ErrorPage />
  },

  {
    path: '*',
    element: <NotFound404 />
  }
])
