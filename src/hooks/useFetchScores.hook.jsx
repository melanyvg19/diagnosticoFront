import { useState, useEffect } from 'react'
// import { PostTotalScoreByUser } from '@services/Admin/PostTotalScoreByUser.service'
import { RESULTS_MOCKS } from '@utils/mocks/MockResults.util'
// import { USER_ID_MOCK } from '@utils/Users.util'
import { GetTotalScore } from '@services/GetTotalScore.service'

const useFetchScores = () => {
  const [scores, setScores] = useState({})
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    const fetchScores = async () => {
      try {
        // const response = await PostTotalScoreByUser({
        //   idUsuario: USER_ID_MOCK
        // })
        const response = await GetTotalScore()

        if (!response.success) {
          throw new Error('Failed to fetch data')
        } else {
          const fixedScores = response.data.puntuaciones.map((puntuacion) => ({
            ...puntuacion,
            puntuacionTotal: Number(puntuacion.puntuacionTotal.toFixed(0))
          }))

          setScores({ puntuaciones: fixedScores })
        }
      } catch (error) {
        setScores(RESULTS_MOCKS)
        console.error('Error fetching data:', error)
      } finally {
        setPageLoading(false)
      }
    }

    fetchScores()
  }, [])

  return { scores, pageLoading }
}

export { useFetchScores }
