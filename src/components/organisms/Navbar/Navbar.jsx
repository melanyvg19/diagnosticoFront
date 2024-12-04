import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Button } from '@atoms/Button/Button'
import { GetTotalScore } from '@services/GetTotalScore.service'
import { ROLES } from '@utils/rolesPermissions.util'
import { routesToHideButtonLogout } from '@utils/Navbar.util'
import {
  removeCookiesSession,
  removeLocalStorageState
} from '@utils/Functions.util'

const Navbar = () => {
  const [canViewResults, setCanViewResults] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const userRole = Cookies.get('userRole')

  useEffect(() => {
    const fetchCanViewResults = async () => {
      try {
        const result = await GetTotalScore()

        if (result.success) {
          setCanViewResults(result.data?.puntuaciones.length > 0)
        }
      } catch (error) {
        console.error('Error fetching can view results:', error)
      }
    }

    if (!routesToHideButtonLogout.includes(location.pathname)) {
      fetchCanViewResults()
    }
  }, [location.pathname])

  const logout = () => {
    removeLocalStorageState()
    removeCookiesSession()

    navigate('/')
  }

  return (
    <nav className="text-white bg-dark-color">
      <ul className="flex flex-wrap items-center justify-center h-full p-2 mx-auto md:p-4 gap-x-4 gap-y-10 min-h-32 max-w-7xl">
        {!routesToHideButtonLogout.includes(location.pathname) && (
          <>
            {userRole !== ROLES.SUPERVISOR && (
              <>
                <li className="flex cursor-pointer hover:underline">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-blue-300' : 'text-white'
                    }
                    to="/inicio"
                  >
                    Glosario
                  </NavLink>
                </li>

                {(userRole === ROLES.ADMIN || canViewResults) && (
                  <li className="flex cursor-pointer hover:underline">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? 'text-blue-300' : 'text-white'
                      }
                      to="/resultados"
                    >
                      Resultados
                    </NavLink>
                  </li>
                )}
              </>
            )}

            {(userRole === ROLES.SUPERVISOR || userRole === ROLES.ADMIN) && (
              <li className="flex cursor-pointer hover:underline">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'text-blue-300' : 'text-white'
                  }
                  to="/indicadores"
                >
                  Indicadores
                </NavLink>
              </li>
            )}

            {userRole === ROLES.ADMIN && (
              <li className="flex cursor-pointer hover:underline">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'text-blue-300' : 'text-white'
                  }
                  to="/usuarios"
                >
                  Usuarios
                </NavLink>
              </li>
            )}
          </>
        )}

        <li className="flex items-center h-full cursor-pointer sm:ml-auto">
          <Link to="/inicio">
            <img
              alt="Logo de Cesde blanco"
              className="object-contain w-64 h-11"
              height={44}
              src="/socials/cesde-logo.svg"
              width={256}
            />
          </Link>
        </li>

        <li className="sm:ml-auto">
          {!routesToHideButtonLogout.includes(location.pathname) && (
            <Button id="logout" text="Cerrar sesión" onClick={logout} />
          )}
        </li>
      </ul>
    </nav>
  )
}

export { Navbar }
