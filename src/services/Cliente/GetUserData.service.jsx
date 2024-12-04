import { fetchWithToken } from '@utils/fetchWithToken.util'

const GetUserData = async (idUsuario) => {
  try {
    const response = await fetchWithToken(
      idUsuario
        ? `/api/usuario/single?idUsuario=${idUsuario}`
        : '/api/usuario/single'
    )

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching user data:', error)

    return { success: false, error: error.message }
  }
}

export { GetUserData }
