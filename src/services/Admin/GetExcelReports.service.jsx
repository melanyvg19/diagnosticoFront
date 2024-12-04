import { fetchWithToken } from '@utils/fetchWithToken.util'

const GetExcelReports = async () => {
  try {
    const response = await fetchWithToken(
      '/api/admin/reports',
      {},
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    if (!response.success) {
      throw new Error('Network response was not ok')
    }

    const { data } = response
    return { success: true, data }
  } catch (error) {
    console.error('Error generating excel reports:', error)

    return { success: false, error: error.message }
  }
}

export { GetExcelReports }
