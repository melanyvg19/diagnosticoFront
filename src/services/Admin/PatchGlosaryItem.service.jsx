import { fetchWithToken } from '@utils/fetchWithToken.util'

const PatchGlosaryItem = async (idGlosario, updatedData) => {
  try {
    const response = await fetchWithToken('/api/admin/glosario', {
      method: 'PATCH',

      body: JSON.stringify({ idGlosario, ...updatedData })
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

export { PatchGlosaryItem }
