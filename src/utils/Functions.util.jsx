import Cookies from 'js-cookie'

export const removeLocalStorageState = () => {
  localStorage.removeItem('answers')
  localStorage.removeItem('categoryId')
  localStorage.removeItem('currentPage')

  localStorage.removeItem('formValues_100')
  localStorage.removeItem('formValues_101')
  localStorage.removeItem('formValues_102')
  localStorage.removeItem('formValues_103')
  localStorage.removeItem('formValues_104')
  localStorage.removeItem('observacion_100')
  localStorage.removeItem('observacion_101')
  localStorage.removeItem('observacion_102')
  localStorage.removeItem('observacion_103')
  localStorage.removeItem('observacion_104')
}

export const removeCookiesSession = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
  Cookies.remove('userRole')
}
