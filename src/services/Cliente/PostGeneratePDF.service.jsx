import { fetchWithToken } from '@utils/fetchWithToken.util'

const PostGeneratePDF = async (formData) => {
  try {
    const response = await fetchWithToken(
      '/api/usuario/download-pdf',
      {
        method: 'POST',
        body: formData
      },
      null
    )

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error downloading reports:', error)

    return { success: false, error: error.message }
  }
}

export { PostGeneratePDF }
