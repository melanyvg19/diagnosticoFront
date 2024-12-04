import { fetchWithToken } from '@utils/fetchWithToken.util'

const GetAllSupervisorClients = async (idSupervisor) => {
  try {
    const response = await fetchWithToken(
      idSupervisor
        ? `/api/supervisor/clients?idSupervisor=${idSupervisor}`
        : '/api/supervisor/clients'
    )

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching supervisor clients:', error)

    return { success: false, error: error.message }
  }
}

export { GetAllSupervisorClients }
