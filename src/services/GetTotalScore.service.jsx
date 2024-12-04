import { fetchWithToken } from '@utils/fetchWithToken.util'

const GetTotalScore = async () => {
  try {
    const response = await fetchWithToken('/api/puntuacion_total')

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching total score:', error)

    return { success: false, error: error.message }
  }
}

export { GetTotalScore }
