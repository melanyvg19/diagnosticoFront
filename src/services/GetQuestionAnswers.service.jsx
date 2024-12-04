import { fetchWithToken } from '@utils/fetchWithToken.util'

const GetQuestionAnswers = async (categoryId) => {
  try {
    const response = await fetchWithToken(
      `/api/pregunta/preguntas_respuestas_by_categoria/${categoryId}`
    )

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching questions/answers:', error)

    return { success: false, error: error.message }
  }
}

export { GetQuestionAnswers }
