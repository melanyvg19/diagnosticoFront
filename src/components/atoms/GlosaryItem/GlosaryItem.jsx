import { useState } from 'react'
import { Title } from '@atoms/Title/Title'

const GlosaryItem = ({
  canEdit,
  onSave,
  src: initialSrc,
  text: initialText,
  title: initialTitle
}) => {
  const [title, setTitle] = useState(initialTitle)
  const [text, setText] = useState(initialText)
  const [src, setSrc] = useState(initialSrc)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)

    await onSave({ nombreGlosario: title, textoGlosario: text, imagen: src })

    setIsLoading(false)
    setIsEditing(false)
  }

  return (
    <article className="p-4">
      {canEdit && (
        <button
          className="flex items-center px-4 py-1 mb-2 ml-auto text-white rounded-full bg-primary"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? (isLoading ? 'Guardando' : 'Guardar') : 'Editar'}

          {isLoading && <div className="ml-2 loader"></div>}
        </button>
      )}

      {isEditing && (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-2 text-lg font-semibold border text-primary"
          />
          <input
            type="text"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            className="object-contain w-full px-2 mx-auto my-4 border"
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded resize-none min-h-40"
          />
        </>
      )}

      {!isEditing && (
        <>
          <Title text={title} className="text-lg font-semibold text-primary" />
          <img
            alt={`Logo para ${title}`}
            className="object-contain mx-auto my-4"
            height={48}
            src={src}
            width={48}
          />
          <p>{text}</p>
        </>
      )}
    </article>
  )
}

export { GlosaryItem }
