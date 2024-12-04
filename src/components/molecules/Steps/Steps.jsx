import './Steps.css'

const Steps = ({ actualStep = 1, steps }) => {
  return (
    <>
      <ul className="hidden w-full max-w-3xl m-auto list-none sm:flex">
        {steps.map((step, idx) => {
          const stepClass = idx + 1 <= actualStep ? 'step active' : 'step'

          // Si quieres que el primer elemento tenga borde: const hasBorder = idx + 1 < steps.length

          // Si quieres que el borde lo tengan todos EXCEPTO el primer elemento:
          const hasBorder = idx + 1 > 1 && idx + 1 <= steps.length

          return (
            <li
              key={step}
              className={`${stepClass} ${hasBorder ? 'has-border' : ''}`}
            >
              <span className="inline-flex items-center justify-center font-bold rounded-full bg-terciary aspect-square step__number">
                {idx + 1}
              </span>

              <span>{step}</span>
            </li>
          )
        })}
      </ul>

      <ul className="flex p-4 my-4 rounded-sm bg-gray-300/60 dark:bg-gray-700 sm:hidden text-primary">
        <li className="flex items-center w-full gap-4">
          <span className="text-nowrap">
            Paso {actualStep} de {steps.length}
          </span>

          <ul className="flex w-full h-2 overflow-hidden text-white bg-gray-300 rounded-full min-w-12">
            {steps.map((_step, i) => (
              <li
                className="bg-primary"
                key={i}
                style={{
                  width: `${100 / steps.length}%`,
                  visibility: actualStep >= i + 1 ? 'visible' : 'hidden'
                }}
              ></li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  )
}

export { Steps }
