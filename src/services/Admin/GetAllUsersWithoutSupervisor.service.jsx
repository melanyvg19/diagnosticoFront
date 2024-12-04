import { fetchWithToken } from '@utils/fetchWithToken.util'

const GetAllUsersWithoutSupervisor = async () => {
  try {
    const response = await fetchWithToken('/api/admin/usuario/no-supervisor')

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching users without supervisor:', error)

    return { success: false, error: error.message }
  }
}

export { GetAllUsersWithoutSupervisor }
