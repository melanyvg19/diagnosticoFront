import { EMAIL_REGEX, PASSWORD_REGEX } from './Regex.util'

export const initialFormValues = {
  // Company fields:
  nitEmpresaNumber: '',
  nombreEmpresa: '',
  direccionPrincipal: '',
  cantidadSedesNumber: '',
  establecimientosComercialesNumber: '',
  sectorEconomico: '',
  alcanceComercial: '',
  esAliadoNumber: '',
  idTipoEmpresa: '',

  // Company error fields:
  nitEmpresaNumberError: '',
  nombreEmpresaError: '',
  direccionPrincipalError: '',
  cantidadSedesNumberError: '',
  establecimientosComercialesNumberError: '',
  sectorEconomicoError: '',
  alcanceComercialError: '',
  esAliadoNumberError: '',
  idTipoEmpresaError: '',

  // User fields:
  nombreCompleto: '',
  cargo: '',
  username: '',
  password: '',
  aniosVinculadoNumber: '',

  // User error fields:
  nombreCompletoError: '',
  cargoError: '',
  usernameError: '',
  passwordError: '',
  aniosVinculadoNumberError: ''
}

export const validateCompanyFields = (values, errors) => {
  // Validación del NIT de la empresa
  if (!values.nitEmpresaNumber) {
    errors.nitEmpresaNumberError = 'El NIT es obligatorio'
  }

  // Validación del nombre de la empresa
  if (!values.nombreEmpresa) {
    errors.nombreEmpresaError = 'El nombre de la empresa es obligatorio'
  }

  // Validación de la dirección principal
  if (!values.direccionPrincipal) {
    errors.direccionPrincipalError = 'La dirección principal es obligatoria'
  }

  // Validación de la cantidad de sedes
  if (!values.cantidadSedesNumber) {
    errors.cantidadSedesNumberError = 'La cantidad de sedes es obligatoria'
  } else if (
    isNaN(values.cantidadSedesNumber) ||
    values.cantidadSedesNumber < 0
  ) {
    errors.cantidadSedesNumberError =
      'La cantidad de sedes debe ser un número positivo'
  }

  // Validación de los establecimientos comerciales
  if (values.establecimientosComercialesNumber === '') {
    errors.establecimientosComercialesNumberError =
      'Debes seleccionar si tienes establecimientos comerciales'
  }

  // Validación del sector económico
  if (values.sectorEconomico === '') {
    errors.sectorEconomicoError = 'Debes seleccionar el sector económico'
  }

  // Validación del alcance comercial
  if (values.alcanceComercial === '') {
    errors.alcanceComercialError = 'Debes seleccionar el alcance comercial'
  }

  // Validación si es aliado
  if (values.esAliadoNumber === '') {
    errors.esAliadoNumberError = 'Debes seleccionar si es un aliado'
  }

  // Validación del tipo de empresa
  if (values.idTipoEmpresa === '') {
    errors.idTipoEmpresaError = 'Debes seleccionar el tipo de empresa'
  }
}

export const validateUserFields = (values, errors) => {
  // Validación del nombre completo
  if (!values.nombreCompleto) {
    errors.nombreCompletoError = 'El nombre completo es obligatorio'
  }

  // Validación del cargo
  if (!values.cargo) {
    errors.cargoError = 'El cargo es obligatorio'
  }

  // Validación de los años vinculados
  if (!values.aniosVinculadoNumber) {
    errors.aniosVinculadoNumberError = 'Los años vinculado son obligatorios'
  } else if (
    isNaN(values.aniosVinculadoNumber) ||
    values.aniosVinculadoNumber <= 0
  ) {
    errors.aniosVinculadoNumberError =
      'Los años vinculados deben ser un número positivo'
  } else if (values.aniosVinculadoNumber > 50) {
    errors.aniosVinculadoNumberError =
      'Los años vinculados no pueden ser mayores a 50'
  }

  // Validación del correo
  if (!values.username) {
    errors.usernameError = 'El correo es obligatorio'
  } else if (!EMAIL_REGEX.test(values.username)) {
    errors.usernameError = 'Formato de correo inválido'
  }

  // Validación de la contraseña
  if (!values.password) {
    errors.passwordError = 'La contraseña es obligatoria'
  } else if (!PASSWORD_REGEX.test(values.password)) {
    errors.passwordError =
      'La contraseña debe tener mínimo 6 caracteres y tener letras y números'
  }
}

export const sectoresEconomicos = [
  'Agricultura',
  'Comercio',
  'Construcción',
  'Industria',
  'Servicios',
  'Transporte'
]

export const tiposEmpresa = [
  'Microempresa (Menos de 19 empleados)',
  'Pequeña (Entre 20 y 99 empleados)',
  'Mediana (Entre 100 y 499 empleados)',
  'Grande (500 o más empleados)'
]

export const alcanceComercial = ['Local', 'Nacional', 'Internacional']
