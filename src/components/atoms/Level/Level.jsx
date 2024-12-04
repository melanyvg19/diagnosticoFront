import { Arrow } from '@atoms/Arrow/Arrow'

const Level = ({ level, text, hasArrow = true, className = '' }) => {
  return (
    <div className={`flex items-center sm:h-32 ${className || ''}`}>
      <p className="flex items-start">
        <b className="flex items-center mr-2 text-nowrap">
          {hasArrow && <Arrow />}

          <span className="ml-2">Nivel {level}</span>
        </b>

        <span className="font-semibold text-gray-color">{text}</span>
      </p>
    </div>
  )
}

export { Level }
