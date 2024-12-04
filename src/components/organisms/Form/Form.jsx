import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { CheckboxRadio } from '@atoms/CheckboxRadio/CheckboxRadio'
import { debounce } from '@hooks/debounce'
import { QuestionTitle } from '@molecules/QuestionTitle/QuestionTitle'
import { TextArea } from '@atoms/TextArea/TextArea'
import { Title } from '@atoms/Title/Title'
import {
  CATEGORIES_NAMES_BY_ID,
  ID_PREGUNTA_TIPO_UNICA_RESPUESTA,
  OPTIONS_TYPES
} from '@utils/Questions.util'

const Form = forwardRef(
  ({ choices, questions, categoryId, onSubmit, answers, setAnswers }, ref) => {
    const [formValues, setFormValues] = useState({})
    const [observacion, setObservacion] = useState('')
    const [unansweredQuestions, setUnansweredQuestions] = useState([])
    const questionRefs = useRef({})

    // ? Efecto para hacer scroll al inicio de la página
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])

    // ? Efecto para inicializar el estado de las respuestas con las preguntas de tipo múltiple o única respuesta
    useEffect(() => {
      const savedAnswers = localStorage.getItem(`formValues_${categoryId}`)
      const savedObservacion = localStorage.getItem(`observacion_${categoryId}`)

      let initialFormValues = {}
      let initialObservacion = ''

      if (savedAnswers) {
        initialFormValues = JSON.parse(savedAnswers)
      } else {
        initialFormValues = questions.reduce((acc, question) => {
          acc[question.idPregunta] =
            question.idTipoPregunta === ID_PREGUNTA_TIPO_UNICA_RESPUESTA
              ? null
              : []
          return acc
        }, {})
      }

      if (savedObservacion) {
        initialObservacion = savedObservacion
      }

      setFormValues(initialFormValues)
      setObservacion(initialObservacion)

      // Cargar respuestas de todas las categorías
      const allAnswers = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.startsWith('formValues_')) {
          const category = key.split('_')[1]
          const categoryValues = JSON.parse(localStorage.getItem(key))
          const categoryObservacion = localStorage.getItem(
            `observacion_${category}`
          )
          allAnswers.push({
            idCategoria: Number(category),
            respuestas: categoryValues,
            observacion: categoryObservacion || ''
          })
        }
      }

      setAnswers(allAnswers)
    }, [questions, categoryId, setAnswers])

    // ? Efecto para actualizar las respuestas en el estado y guardarlas en el arreglo de respuestas
    useEffect(() => {
      const filteredValues = Object.entries(formValues).reduce(
        (acc, [key, value]) => {
          if (value !== null && value.length !== 0) {
            acc[key] = value
          }
          return acc
        },
        {}
      )

      const answersData = {
        idCategoria: categoryId,
        respuestas: filteredValues,
        observacion
      }

      const previousAnswer = answers.find((a) => a.idCategoria === categoryId)
      if (
        JSON.stringify(previousAnswer?.respuestas) !==
          JSON.stringify(filteredValues) ||
        previousAnswer?.observacion !== observacion
      ) {
        setAnswers([
          ...answers.filter((a) => a.idCategoria !== categoryId),
          answersData
        ])
      }
    }, [formValues, observacion, setAnswers, answers, categoryId])

    const saveAnswers = (values, obs) => {
      localStorage.setItem(`formValues_${categoryId}`, JSON.stringify(values))
      localStorage.setItem(`observacion_${categoryId}`, obs)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const saveAnswersDebounced = useCallback(debounce(saveAnswers, 300), [
      categoryId
    ])

    const handleChange = (e, idTipoOpcion) => {
      const { name, value, type, checked } = e.target
      const questionId = Number(name)

      if (name === 'observacion') {
        setObservacion(value)
        saveAnswersDebounced(formValues, value)
        return
      }

      setFormValues((prevValues) => {
        const newValues = { ...prevValues }

        if (type === 'radio') {
          newValues[questionId] = Number(value)
        } else if (type === 'checkbox') {
          if (!Array.isArray(newValues[questionId])) {
            newValues[questionId] = []
          }

          if (idTipoOpcion === OPTIONS_TYPES.NINGUNA_ANTERIORES) {
            newValues[questionId] = checked ? [Number(value)] : []
          } else {
            const updatedCheckboxes = checked
              ? [...newValues[questionId], Number(value)]
              : newValues[questionId].filter((v) => v !== Number(value))

            newValues[questionId] = updatedCheckboxes.filter(
              (v) => v !== OPTIONS_TYPES.NINGUNA_ANTERIORES
            )

            newValues[questionId] = newValues[questionId].filter(
              (v) =>
                choices.find((choice) => choice.idOpcion === v)
                  ?.idTipoOpcion !== OPTIONS_TYPES.NINGUNA_ANTERIORES
            )
          }
        }

        // Remove error state for the answered question
        if (unansweredQuestions.includes(questionId)) {
          setUnansweredQuestions((prev) =>
            prev.filter((id) => id !== questionId)
          )
        }

        saveAnswersDebounced(newValues, observacion)
        return newValues
      })
    }

    const isFormValid = () => {
      return Object.values(formValues).every((value) => {
        return Array.isArray(value) ? value.length > 0 : value !== null
      })
    }

    useImperativeHandle(ref, () => ({
      isFormValid,
      highlightUnansweredQuestions: () => {
        const unanswered = questions
          .map((q) => q.idPregunta)
          .filter((id) => !formValues[id] || formValues[id].length === 0)
        setUnansweredQuestions(unanswered)

        if (unanswered.length > 0) {
          questionRefs.current[unanswered[0]].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    }))

    const handleSubmit = (e) => {
      e.preventDefault()

      if (!isFormValid()) return

      onSubmit()
    }

    return (
      <form onSubmit={handleSubmit} className="grid" id={categoryId}>
        {questions.map(({ idPregunta, nombrePregunta, idTipoPregunta }) => (
          <div
            className={`my-2 ${
              unansweredQuestions.includes(idPregunta) ? 'text-red-500' : ''
            }`}
            key={idPregunta}
            ref={(el) => (questionRefs.current[idPregunta] = el)}
          >
            <QuestionTitle
              idPregunta={idPregunta}
              idTipoPregunta={idTipoPregunta}
              nombrePregunta={nombrePregunta}
              unansweredQuestions={unansweredQuestions}
            />

            {choices
              .filter((choice) => choice.idPregunta === idPregunta)
              .map(({ idOpcion, textoOpcion, idTipoOpcion }) => (
                <CheckboxRadio
                  checked={
                    idTipoPregunta === ID_PREGUNTA_TIPO_UNICA_RESPUESTA
                      ? formValues[idPregunta] === idOpcion
                      : formValues[idPregunta]?.includes(idOpcion) || false
                  }
                  id={idOpcion}
                  key={idOpcion}
                  name={idPregunta}
                  onChange={(e) => handleChange(e, idTipoOpcion)}
                  text={textoOpcion}
                  type={
                    idTipoPregunta === ID_PREGUNTA_TIPO_UNICA_RESPUESTA
                      ? 'radio'
                      : 'checkbox'
                  }
                  value={idOpcion}
                />
              ))}
          </div>
        ))}

        <Title
          text={`Observaciones del formulario ${CATEGORIES_NAMES_BY_ID[categoryId]}`}
          className="my-2 text-xl font-normal text-start"
        />
        <TextArea
          autoComplete="off"
          id="observacion"
          maxLength={2000}
          name="observacion"
          onChange={handleChange}
          placeholder="Ingresa alguna observación extra"
          required={false}
          value={observacion}
        />
      </form>
    )
  }
)

Form.displayName = 'Form'

export { Form }
