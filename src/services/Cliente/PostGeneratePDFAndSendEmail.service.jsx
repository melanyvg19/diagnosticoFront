import { fetchWithToken } from '@utils/fetchWithToken.util'

const PostGeneratePDFAndSendEmail = async (formData, idUsuario) => {
  try {
    const response = await fetchWithToken(
      idUsuario
        ? `/api/usuario/send-pdf?idUsuario=${idUsuario}`
        : '/api/usuario/send-pdf',
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
    console.error('Error sending email:', error)

    return { success: false, error: error.message }
  }
}

export { PostGeneratePDFAndSendEmail }
