import { GetExcelReports } from '@services/Admin/GetExcelReports.service'

const handleDownloadExcelReports = async ({ setIsExcelLoading }) => {
  setIsExcelLoading(true)

  try {
    const result = await GetExcelReports()

    if (result.success) {
      const byteCharacters = atob(result.data?.respuesta)
      const byteNumbers = new Array(byteCharacters.length)

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      const blob = new Blob([byteArray], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })

      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.setAttribute('download', 'reportes_empresas.xlsx')

      link.click()
    }
  } catch (error) {
    console.error('Error downloading Excel reports:', error)
  } finally {
    setIsExcelLoading(false)
  }
}

export { handleDownloadExcelReports }
