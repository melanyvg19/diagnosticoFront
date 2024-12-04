import { fetchWithToken } from '@utils/fetchWithToken.util'

const PostAnswers = async (answers) => {
  try {
    const response = await fetchWithToken('/api/formulario', {
      method: 'POST',

      body: JSON.stringify(answers)
    })

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error sending answers:', error)

    return { success: false, error: error.message }
  }
}

export { PostAnswers }
