import { fetchWithToken } from '@utils/fetchWithToken.util'

const GetSearchUsers = async (query) => {
  try {
    const response = await fetchWithToken(
      `/api/admin/usuario/search?query=${query}`
    )

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

export { GetSearchUsers }
