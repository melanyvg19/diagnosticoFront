import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@atoms/Button/Button'
import { Footer } from '@organisms/Footer/Footer'
import { handleCompanyRegistration } from '@hooks/handleCompanyRegistration.hook'
import { handleUserRegistration } from '@hooks/handleUserRegistration.hook'
import { Navbar } from '@organisms/Navbar/Navbar'
import { RegisterCompany } from '@organisms/RegisterCompany/RegisterCompany'
import { RegisterUser } from '@organisms/RegisterUser/RegisterUser'
import { Title } from '@atoms/Title/Title'
import {
  initialFormValues,
  validateCompanyFields,
  validateUserFields
} from '@utils/Register.util'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(initialFormValues)
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const validateForm = (values) => {
    const errors = {}

    validateCompanyFields(values, errors)
    validateUserFields(values, errors)

    return errors
  }

  const register = async (e) => {
    e.preventDefault()

    setLoading(true)

    const errors = validateForm(formValues)

    if (Object.keys(errors).length > 0) {
      setFormValues((prevValues) => ({
        ...prevValues,
        ...errors
      }))

      return setLoading(false)
    }

    if (!isChecked) {
      toast.error('Debes aceptar los términos y condiciones')
      return setLoading(false)
    }

    try {
      const companyResult = await handleCompanyRegistration(formValues)

      if (companyResult.success) {
        const userResult = await handleUserRegistration(formValues)

        if (userResult.success) {
          toast.success(
            '¡Registro completado con éxito! Recibirá un correo electrónico cuando su cuenta sea activada.'
          )
          navigate('/')
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox') {
      return setFormValues((prevValues) => {
        const newValues = { ...prevValues }
        const selectedValues = newValues[name] || []

        if (checked) {
          newValues[name] = [...selectedValues, value]
        } else {
          newValues[name] = selectedValues.filter((v) => v !== value)
        }

        return {
          ...newValues,
          [`${name}Error`]: ''
        }
      })
    }

    if (name.includes('Number') && type !== 'tel' && type !== 'number') {
      return setFormValues((prevValues) => ({
        ...prevValues,
        [name]: Number(value),
        [`${name}Error`]: ''
      }))
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      [`${name}Error`]: ''
    }))
  }

  const handleCheckBox = () => {
    setIsChecked(!isChecked)
  }
  console.log(isChecked)
  return (
    <>
      <section className="mb-6">
        <Navbar />

        <article className="grid max-w-2xl gap-4 p-8 mx-auto mt-4 shadow-md">
          <Title text="Registro de usuarios" className="text-3xl" />

          <form className="grid gap-3" onSubmit={register}>
            <RegisterCompany
              formValues={formValues}
              handleChange={handleChange}
            />

            <RegisterUser formValues={formValues} handleChange={handleChange} />

            <span className="flex items-start py-4 space-x-2">
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={isChecked}
                id="politicas"
                onChange={handleCheckBox}
              />

              <label htmlFor="politicas">
                Estoy de acuerdo con la política de tratamiento y protección de
                datos personales de CESDE SAS publicada de manera detallada para
                su consulta en el siguiente link:
                <Link
                  className="ml-1 text-secoundary hover:text-secoundary-hover"
                  to="https://acortar.link/2ohur0"
                  target="_blank"
                >
                  políticas de tratamiento y protección de datos personales
                </Link>
              </label>
            </span>

            <Button
              disabled={loading}
              isLoading={loading}
              text={loading ? 'Cargando' : 'Registrarme'}
              className="mt-6"
            />

            <span className="text-center">
              ¿Ya tienes una cuenta?
              <Link
                className="ml-1 font-semibold underline text-secoundary hover:text-secoundary-hover"
                to="/"
              >
                Inicia sesión aquí
              </Link>
            </span>
          </form>
        </article>
      </section>

      <Footer />
    </>
  )
}

export { Register }
