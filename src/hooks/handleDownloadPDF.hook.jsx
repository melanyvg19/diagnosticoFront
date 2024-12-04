import { captureElementAsImage } from '@utils/Results.util'
import { PostGeneratePDF } from '@services/Cliente/PostGeneratePDF.service'

const handleDownloadPDF = async ({ articleRef, asideRef, setIsPDFLoading }) => {
  setIsPDFLoading(true)

  try {
    const articleCanvas = await captureElementAsImage(articleRef)
    const asideCanvas = await captureElementAsImage(asideRef)

    const articleBlob = await new Promise((resolve) =>
      articleCanvas.toBlob(resolve)
    )
    const asideBlob = await new Promise((resolve) =>
      asideCanvas.toBlob(resolve)
    )

    const formData = new FormData()
    formData.append('graficaImage', articleBlob, 'article.png')
    formData.append('termometroImage', asideBlob, 'aside.png')

    const response = await PostGeneratePDF(formData)

    if (response.success && response.data && response.data.respuesta) {
      const binaryString = window.atob(response.data.respuesta)
      const len = binaryString.length
      const bytes = new Uint8Array(len)

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      const blob = new Blob([bytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = 'Resultados diagnóstico.pdf'
      document.body.appendChild(a)
      a.click()

      URL.revokeObjectURL(url)
    } else {
      console.error('Error: No se pudo descargar el PDF.')
    }
  } catch (error) {
    console.error('Error generating PDF with results:', error)
  } finally {
    setIsPDFLoading(false)
  }
}

export { handleDownloadPDF }
