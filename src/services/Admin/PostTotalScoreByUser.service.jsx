import { fetchWithToken } from '@utils/fetchWithToken.util'

const PostTotalScoreByUser = async ({ idUsuario }) => {
  try {
    const response = await fetchWithToken('/api/admin/results', {
      method: 'POST',

      body: JSON.stringify({ idUsuario })
    })

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

export { PostTotalScoreByUser }
