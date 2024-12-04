import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Banner } from '@atoms/Banner/Banner'
import { Button } from '@atoms/Button/Button'
import { EMAIL_REGEX, PASSWORD_REGEX } from '@utils/Regex.util'
import { Footer } from '@organisms/Footer/Footer'
import { Input } from '@atoms/Input/Input'
import { PostLoginUser } from '@services/PostLoginUser.service'
import { ROLES } from '@utils/rolesPermissions.util'
import { Title } from '@atoms/Title/Title'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    usernameError: '',
    passwordError: ''
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const isUsernameValid = (value) => {
    const usernameRegex = EMAIL_REGEX

    return usernameRegex.test(value)
  }

  const isPasswordValid = (value) => {
    const passwordRegex = PASSWORD_REGEX

    return passwordRegex.test(value)
  }

  const login = async (e) => {
    e.preventDefault()

    setLoading(true)

    const { username, password } = formValues

    let usernameError = ''
    let passwordError = ''

    if (!username) {
      usernameError = 'El correo es obligatorio'
    } else if (!isUsernameValid(username)) {
      usernameError = 'Formato de correo inválido'
    }

    if (!password) {
      passwordError = 'La contraseña es obligatoria'
    } else if (!isPasswordValid(password)) {
      passwordError =
        'La contraseña debe tener mínimo 6 caracteres y tener letras y números'
    }

    if (usernameError || passwordError) {
      setFormValues({
        ...formValues,
        usernameError,
        passwordError
      })

      setLoading(false)
      return
    }

    try {
      const result = await PostLoginUser({
        username,
        password
      })

      if (result.success) {
        const { accessToken, refreshToken, role } = result.data

        Cookies.set('accessToken', accessToken)
        Cookies.set('refreshToken', refreshToken)
        Cookies.set('userRole', role)

        if (role === ROLES.SUPERVISOR) {
          return navigate('/indicadores')
        }

        navigate('/inicio')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      [`${name}Error`]: ''
    }))
  }

  return (
    <>
      <section className="mb-4">
        {/* // ? Desktop banner */}
        <Banner
          alt="Diagnóstico digital temp tech login banner"
          className="hidden md:block w-[1248px] object-contain mx-auto mb-4"
          height={400}
          src="/banners/login-banner-temptech.webp"
          width={1248}
        />

        {/* // ? Mobile banner */}
        <Banner
          alt="Diagnóstico digital temp tech login banner"
          className="md:hidden max-h-[400px] w-fit object-contain mx-auto mb-4"
          height={400}
          src="/banners/login-banner-temptech-mobile.webp"
          width={350}
        />

        <p className="max-w-4xl px-2 mx-auto my-8 text-lg text-center text-balance dark:text-white text-gray-color">
          Evalúa la oportunidad de mejora tecnológica en todas las áreas de una
          organización: estratégica, comercial, financiera, producción y
          operación. Su objetivo es establecer una hoja de ruta para la
          transformación digital, que facilite a la empresa aumentar su
          productividad, optimizar sus costos y lograr un crecimiento sostenido
          en el mercado.
        </p>

        <article className="grid max-w-lg gap-4 p-8 mx-auto shadow-md">
          <Title text="Inicio de sesión" className="text-3xl" />

          <form onSubmit={login} className="grid gap-6">
            <Input
              className={`${formValues.usernameError ? 'input--error' : ''}`}
              errorMessage={formValues.usernameError}
              hasError={!!formValues.usernameError}
              id="username"
              name="username"
              onChange={handleChange}
              placeholder="Correo electrónico"
              type="text"
              value={formValues.username}
            />

            <Input
              className={`${formValues.passwordError ? 'input--error' : ''}`}
              errorMessage={formValues.passwordError}
              hasError={!!formValues.passwordError}
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Contraseña"
              showPasswordIcon={true}
              type="password"
              value={formValues.password}
            />

            <Button
              disabled={loading}
              isLoading={loading}
              text={loading ? 'Iniciando sesión' : 'Iniciar sesión'}
            />

            <span className="text-center">
              ¿No tienes una cuenta?
              <Link
                className="ml-1 font-semibold underline text-secoundary hover:text-secoundary-hover"
                to="/register"
              >
                Regístrate aquí
              </Link>
            </span>
          </form>
        </article>
      </section>

      <Footer />
    </>
  )
}

export { Login }
