import { fetchWithToken } from '@utils/fetchWithToken.util'

const GetGlosaryItems = async () => {
  try {
    const response = await fetchWithToken('/api/glosario')

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching glosary items:', error)

    return { success: false, error: error.message }
  }
}

export { GetGlosaryItems }
