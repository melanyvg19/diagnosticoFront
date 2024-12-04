import { toast } from 'react-toastify'
import { PostRegisterUser } from '@services/PostRegisterUser.service'
import {
  BAD_REQUEST_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE
} from '@utils/StatusCodes.util'

const handleUserRegistration = async (formValues) => {
  const {
    nombreCompleto,
    cargo,
    username,
    password,
    aniosVinculadoNumber,
    nitEmpresaNumber
  } = formValues

  const userResult = await PostRegisterUser({
    nombreCompleto,
    cargo,
    username,
    password,
    aniosVinculado: aniosVinculadoNumber,
    empresa: { nitEmpresa: nitEmpresaNumber }
  })

  if (
    userResult.data?.statusCode === UNAUTHORIZED_STATUS_CODE ||
    userResult.data?.statusCode === BAD_REQUEST_STATUS_CODE
  ) {
    toast.error(userResult.data?.message)
    throw new Error(userResult.data?.message)
  }

  return userResult
}

export { handleUserRegistration }
