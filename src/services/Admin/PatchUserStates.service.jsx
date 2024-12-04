import { fetchWithToken } from '@utils/fetchWithToken.util'

const PatchUserStates = async (userId, updatedUserData) => {
  try {
    const response = await fetchWithToken('/api/admin/usuario/update', {
      method: 'PATCH',

      body: JSON.stringify({ userId, ...updatedUserData })
    })

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error updating glosary item:', error)

    return { success: false, error: error.message }
  }
}

export { PatchUserStates }
