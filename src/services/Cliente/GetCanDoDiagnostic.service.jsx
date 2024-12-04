import { fetchWithToken } from '@utils/fetchWithToken.util'

const GetCanDoDiagnostic = async () => {
  try {
    const response = await fetchWithToken('/api/usuario/formulario-finished')

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching users:', error)

    return { success: false, error: error.message }
  }
}

export { GetCanDoDiagnostic }
