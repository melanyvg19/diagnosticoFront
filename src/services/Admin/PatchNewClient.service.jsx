import { fetchWithToken } from '@utils/fetchWithToken.util'

const PatchNewClient = async (idSupervisor, idClienteList) => {
  try {
    const response = await fetchWithToken(
      '/api/admin/supervisor/assign-client',
      {
        method: 'PATCH',

        body: JSON.stringify({ idSupervisor, idClienteList })
      }
    )

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error creating client:', error)

    return { success: false, error: error.message }
  }
}

export { PatchNewClient }
