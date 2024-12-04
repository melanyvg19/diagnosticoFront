import { toast } from 'react-toastify'
import { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'
// import { Button } from '@atoms/Button/Button'
import { ButtonQuaternary } from '@atoms/ButtonQuaternary/ButtonQuaternary'
import { ButtonSecoundary } from '@atoms/ButtonSecoundary/ButtonSecoundary'
import { captureElementAsImage } from '@utils/Results.util'
import { GetUserData } from '@services/Cliente/GetUserData.service'
import { handleDownloadExcelReports } from '@hooks/handleDownloadExcelReports.hook'
// import { handleDownloadPDF } from '@hooks/handleDownloadPDF.hook'
import { PostGeneratePDFAndSendEmail } from '@services/Cliente/PostGeneratePDFAndSendEmail.service'
import { RadarChart } from '@molecules/RadarChart/RadarChart'
import { RESULTS_MOCKS } from '@utils/mocks/MockResults.util'
import { ResultsSkeleton } from '@layouts/ResultsSkeleton/ResultsSkeleton'
import { ROLES } from '@utils/rolesPermissions.util'
import { Thermometer } from '@molecules/Thermometer/Thermometer'
import { Title as TitleComponent } from '@atoms/Title/Title'
import { useFetchScores } from '@hooks/useFetchScores.hook'
import { USER_ID_MOCK } from '@utils/Users.util'
import './Resultados.css'

const Resultados = () => {
  const { scores, pageLoading } = useFetchScores()
  const [averageScore, setAverageScore] = useState(0)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [isExcelLoading, setIsExcelLoading] = useState(false)
  // const [isPDFLoading, setIsPDFLoading] = useState(false)
  const [userData, setUserData] = useState({})
  const articleRef = useRef(null)
  const asideRef = useRef(null)
  const userRole = Cookies.get('userRole')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchUserCompany = async () => {
      try {
        // const result = await GetUserData(USER_ID_MOCK)
        const result = await GetUserData()

        if (result.success) {
          setUserData(result.data)
        }
      } catch (error) {
        console.error('Error fetching can view results:', error)
      }
    }

    fetchUserCompany()
  }, [])

  // useEffect(() => {
  //   const sendEmailWithResults = async () => {
  //     try {
  //       const articleCanvas = await captureElementAsImage(articleRef)
  //       const asideCanvas = await captureElementAsImage(asideRef)

  //       const articleBlob = await new Promise((resolve) =>
  //         articleCanvas.toBlob(resolve)
  //       )
  //       const asideBlob = await new Promise((resolve) =>
  //         asideCanvas.toBlob(resolve)
  //       )

  //       const formData = new FormData()
  //       formData.append('graficaImage', articleBlob, 'article.png')
  //       formData.append('termometroImage', asideBlob, 'aside.png')

  //       await PostGeneratePDFAndSendEmail(formData)
  //     } catch (error) {
  //       console.error('Error sending email with results:', error)
  //     }
  //   }

  //   const shouldSendEmail = localStorage.getItem('sendPDFEmail')

  //   if (!pageLoading && shouldSendEmail) {
  //     setTimeout(() => {
  //       sendEmailWithResults()
  //     }, 1000)

  //     localStorage.removeItem('sendPDFEmail')
  //   }
  // }, [pageLoading])

  useEffect(() => {
    const filteredScore =
      scores.puntuaciones?.map((score) => score.puntuacionTotal) ||
      RESULTS_MOCKS

    setAverageScore(
      (
        filteredScore?.reduce((acc, curr) => acc + curr, 0) /
        filteredScore?.length
      ).toFixed(0) || ''
    )
  }, [scores])

  const sendEmailToUser = async () => {
    setIsEmailLoading(true)

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

      const response = await PostGeneratePDFAndSendEmail(formData, USER_ID_MOCK)

      if (response.success) {
        toast.success(response.data.respuesta)
      }
    } catch (error) {
      console.error('Error sending email with results:', error)
    } finally {
      setIsEmailLoading(false)
    }
  }

  return (
    <section className="flex flex-col items-center justify-center gap-2 px-1 py-2 text-black bg-white border rounded-lg sm:px-2">
      {pageLoading && <ResultsSkeleton />}

      {!pageLoading && (
        <>
          <div className="flex flex-wrap justify-end w-full gap-2">
            {userRole === ROLES.ADMIN && (
              <>
                <ButtonQuaternary
                  isLoading={isExcelLoading}
                  onClick={() =>
                    handleDownloadExcelReports({ setIsExcelLoading })
                  }
                  text={
                    isExcelLoading
                      ? 'Descargando'
                      : 'Descargar informe en Excel'
                  }
                />

                <ButtonSecoundary
                  isLoading={isEmailLoading}
                  onClick={() => sendEmailToUser()}
                  text={
                    isEmailLoading
                      ? 'Enviando email'
                      : `Enviar correo a la empresa ${userData.empresa}`
                  }
                />
              </>
            )}

            {/* <Button
              disabled={isPDFLoading}
              isLoading={isPDFLoading}
              onClick={() =>
                handleDownloadPDF({ articleRef, asideRef, setIsPDFLoading })
              }
              text={isPDFLoading ? 'Descargando' : 'Descargar informe en PDF'}
            /> */}
          </div>

          <article className="grid max-w-3xl justify-items-center">
            <TitleComponent text="Nivel de Madurez Digital" />

            <TitleComponent className="text-xl" text={userData.empresa} />

            <p className="my-4 text-sm text-center sm:text-base">
              A continuación, se presenta de forma gráfica y numérica el nivel
              de madurez digital identificado en la organización, según las
              cinco dimensiones evaluadas.
            </p>

            <RadarChart scores={scores} />
          </article>

          <aside className="flex flex-col justify-between max-w-3xl">
            <div className="grid gap-2">
              <TitleComponent text="Niveles" />

              <Thermometer currentLevel={averageScore} />
            </div>
          </aside>

          {/* Gráfica de la araña y termómetro ocultos para enviar la imágen al Backend */}
          {/* Y poder generar el PDF con los resultados que se envían al correo. */}
          <article
            className="absolute right-full grid w-[768px] justify-items-center"
            ref={articleRef}
          >
            <TitleComponent text="Nivel de Madurez Digital" />

            <TitleComponent className="text-xl" text={userData.empresa} />

            <p className="my-4 text-sm text-center sm:text-base">
              A continuación, se presenta de forma gráfica y numérica el nivel
              de madurez digital identificado en la organización, según las
              cinco dimensiones evaluadas.
            </p>

            <RadarChart scores={scores} isResponsive={false} />
          </article>

          <aside
            className="absolute right-full flex flex-col justify-between w-[768px]"
            ref={asideRef}
          >
            <div className="grid gap-2">
              <TitleComponent text="Niveles" />

              <Thermometer currentLevel={averageScore} isResponsive={false} />
            </div>
          </aside>
        </>
      )}
    </section>
  )
}

export { Resultados }
