import html2canvas from 'html2canvas'

export const captureElementAsImage = async (elementRef, scale = 2) => {
  return await html2canvas(elementRef.current, {
    scale,
    useCORS: true,
    logging: false
  })
}
