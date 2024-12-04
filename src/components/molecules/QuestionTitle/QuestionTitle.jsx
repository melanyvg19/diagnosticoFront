import { ID_PREGUNTA_TIPO_UNICA_RESPUESTA } from '@utils/Questions.util'

const QuestionTitle = ({
  idPregunta,
  idTipoPregunta,
  nombrePregunta,
  unansweredQuestions
}) => {
  return (
    <h2 className="flex flex-wrap gap-1 my-2 text-lg select-none">
      {nombrePregunta}

      <span className="text-gray-500 dark:text-slate-300">
        (
        {idTipoPregunta === ID_PREGUNTA_TIPO_UNICA_RESPUESTA
          ? 'Única respuesta'
          : 'Múltiple respuesta'}
        )
      </span>

      <b>
        {unansweredQuestions.includes(idPregunta)
          ? '*Esta pregunta es obligatoria*'
          : ''}
      </b>
    </h2>
  )
}

export { QuestionTitle }
