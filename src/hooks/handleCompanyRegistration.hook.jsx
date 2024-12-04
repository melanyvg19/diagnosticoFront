import { toast } from 'react-toastify'
import { PostRegisterCompany } from '@services/PostRegisterCompany.service'
import {
  BAD_REQUEST_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE
} from '@utils/StatusCodes.util'

const handleCompanyRegistration = async (formValues) => {
  const {
    nitEmpresaNumber,
    nombreEmpresa,
    direccionPrincipal,
    cantidadSedesNumber,
    establecimientosComercialesNumber,
    sectorEconomico,
    alcanceComercial,
    esAliadoNumber,
    idTipoEmpresa
  } = formValues

  const companyResult = await PostRegisterCompany({
    nitEmpresa: nitEmpresaNumber,
    nombreEmpresa,
    direccionPrincipal,
    cantidadSedes: cantidadSedesNumber,
    establecimientosComerciales: establecimientosComercialesNumber,
    sectorEconomico,
    alcanceComercial,
    esAliado: esAliadoNumber,
    tipoEmpresa: idTipoEmpresa
  })

  if (
    companyResult.data?.statusCode === UNAUTHORIZED_STATUS_CODE ||
    companyResult.data?.statusCode === BAD_REQUEST_STATUS_CODE
  ) {
    toast.error(companyResult.data?.message)
    throw new Error(companyResult.data?.message)
  }

  return companyResult
}

export { handleCompanyRegistration }
