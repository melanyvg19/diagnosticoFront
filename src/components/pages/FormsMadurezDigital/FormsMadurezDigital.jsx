import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import {
  CATEGORIES_IDS,
  CATEGORIES_NAMES,
  TOTAL_CATEGORIES
} from '@utils/Questions.util'
import {
  MOCK_CHOICES,
  MOCK_QUESTIONS
} from '@utils/mocks/MockQuestionChoices.util'
import { Banner } from '@atoms/Banner/Banner'
import { Button } from '@atoms/Button/Button'
import { Form } from '@organisms/Form/Form'
import { FormsSkeleton } from '@layouts/FormsSkeleton/FormsSkeleton'
import { GetQuestionAnswers } from '@services/GetQuestionAnswers.service'
import { PostAnswers } from '@services/PostAnswers.service'
import { removeLocalStorageState } from '@utils/Functions.util'
import { Steps } from '@molecules/Steps/Steps'

const FormsMadurezDigital = () => {
  const [buttonLoading, setButtonLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [questionsChoices, setQuestionsChoices] = useState([])
  const [categoryId, setCategoryId] = useState(
    Number(localStorage.getItem('categoryId')) ||
      CATEGORIES_IDS.culturaOrganizacional
  )
  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem('currentPage')) || 1
  )
  const [formAnswers, setFormAnswers] = useState([])
  const totalPages = TOTAL_CATEGORIES
  const formRef = useRef()
  const navigate = useNavigate()

  // ? Efecto para hacer scroll al inicio de la página
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchQuestionAnswers = async () => {
      setPageLoading(true)

      try {
        const response = await GetQuestionAnswers(categoryId)

        if (response.success) {
          setQuestionsChoices(response.data)
        } else {
          console.error('Error fetching questions/answers:', response.error)
        }
      } catch (error) {
        console.error('Error fetching questions/answers:', error)
      } finally {
        setPageLoading(false)
      }
    }

    fetchQuestionAnswers()
  }, [categoryId])

  const handlePageChange = (page, categoryId) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      setCategoryId(categoryId)

      localStorage.setItem('categoryId', JSON.stringify(categoryId))
      localStorage.setItem('currentPage', JSON.stringify(page))
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1, categoryId - 1)
    }
  }

  const handleNext = () => {
    if (formRef.current && !formRef.current.isFormValid()) {
      toast.error(
        'Existen preguntas sin responder. Por favor, asegúrese de responder todas las preguntas antes de continuar.'
      )

      return formRef.current.highlightUnansweredQuestions()
    }

    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1, categoryId + 1)
    }
  }

  const sendAnswers = async () => {
    if (formRef.current && !formRef.current.isFormValid()) {
      toast.error(
        'Existen preguntas sin responder. Por favor, asegúrese de responder todas las preguntas antes de continuar.'
      )

      return formRef.current.highlightUnansweredQuestions()
    }

    setButtonLoading(true)

    try {
      const result = await PostAnswers(formAnswers)

      if (result.success) {
        removeLocalStorageState()

        localStorage.setItem('sendPDFEmail', 'true')

        toast.success(
          '¡Las respuestas han sido enviadas correctamente! Recibirá los resultados del diagnóstico en su correo electrónico.'
        )

        navigate('/resultados')
      }
    } catch (error) {
      toast.error(
        'Se ha producido un error inesperado. Por favor, intente nuevamente más tarde.'
      )
      console.error(error)
    } finally {
      setButtonLoading(false)
    }
  }

  return (
    <section>
      {pageLoading && <FormsSkeleton />}

      {!pageLoading && (
        <>
          {/* // ? Desktop banner */}
          <Banner
            alt="Diagnóstico digital temp tech banner"
            className="hidden md:block w-[1248px] object-contain mb-4"
            height={400}
            src={`/banners/${categoryId}-diagnostico-digital-temp-tech-banner.webp`}
            width={1248}
          />

          {/* // ? Mobile banner */}
          <Banner
            alt="Diagnóstico digital temp tech banner"
            className="md:hidden max-h-[400px] mx-auto w-fit object-contain mb-4"
            height={400}
            src={`/banners/${categoryId}-diagnostico-digital-temp-tech-banner-mobile.webp`}
            width={350}
          />

          <p className="mb-2 text-lg text-gray-color dark:text-slate-200">
            Por favor responda a cada una de las siguientes preguntas
            seleccionando la más adecuada de acuerdo a la situación actual de su
            organización, teniendo en cuenta que en algunas de ellas podrá
            elegir múltiples respuestas o una sola respuesta.
          </p>

          <p className="mb-2 text-lg text-gray-color dark:text-slate-200">
            De la misma manera para el caso en que se considere relevante,
            completar en las observaciones anotaciones importantes para
            complementar su respuesta.
          </p>

          <Form
            answers={formAnswers}
            categoryId={categoryId}
            choices={questionsChoices.opcionList || MOCK_CHOICES}
            onSubmit={sendAnswers}
            questions={questionsChoices.preguntaList || MOCK_QUESTIONS}
            ref={formRef}
            setAnswers={setFormAnswers}
          />
        </>
      )}

      <Steps
        actualStep={currentPage}
        steps={[
          CATEGORIES_NAMES.culturaOrganizacional,
          CATEGORIES_NAMES.personas,
          CATEGORIES_NAMES.infraestructura,
          CATEGORIES_NAMES.procesos,
          CATEGORIES_NAMES.marketingMix
        ]}
      />

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-0">
        {currentPage > 1 && (
          <Button
            disabled={pageLoading}
            onClick={handlePrevious}
            text="Anterior"
            type="button"
          />
        )}

        {currentPage < totalPages && (
          <Button
            disabled={pageLoading}
            onClick={handleNext}
            text="Siguiente"
            type="button"
          />
        )}

        {currentPage === totalPages && (
          <Button
            disabled={buttonLoading || pageLoading}
            form={categoryId}
            isLoading={buttonLoading}
            onClick={handleNext}
            text={buttonLoading ? 'Cargando' : 'Terminar diagnóstico'}
            type="submit"
          />
        )}
      </div>
    </section>
  )
}

export { FormsMadurezDigital }
