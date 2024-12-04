import { Arrow } from '@atoms/Arrow/Arrow'
import { Level } from '@atoms/Level/Level'
import './Thermometer.css'

const Thermometer = ({ currentLevel = 0, isResponsive = true }) => {
  const topPosition = `calc(${100 - currentLevel}% + 4px)`

  const mobileLevelsInfoClasses = isResponsive
    ? 'flex flex-col gap-4 py-6 text-sm sm:hidden'
    : 'flex-col gap-4 py-6 text-sm hidden'

  const desktopLevelsInfoClasses = isResponsive
    ? 'hidden text-sm sm:flex flex-col gap-1 py-6 h-[708px] justify-center'
    : 'text-sm flex flex-col gap-1 py-6 h-[708px] justify-center'

  const containerClasses = isResponsive
    ? 'relative flex flex-col items-center gap-1 sm:flex-row'
    : 'relative flex items-center gap-1 flex-row'

  return (
    <section className={containerClasses}>
      {/* // ? Mobile levels info */}
      <article className={mobileLevelsInfoClasses} id="levels">
        <Level
          className="text-green-dark-color"
          hasArrow={false}
          level="5"
          text="La organización está inmersa en una cultura de transformación digital y está en constante evolución para mejorar su rendimiento digital."
        />

        <Level
          className="text-green-light-color"
          hasArrow={false}
          level="4"
          text="La organización ha comenzado a adoptar una visión digital, con varias iniciativas implementadas y aplicadas a sus operaciones."
        />

        <Level
          className="text-yellow-color"
          hasArrow={false}
          level="3"
          text="La transformación digital es reconocida como parte integral de la cultura organizacional."
        />

        <Level
          className="text-orange-color"
          hasArrow={false}
          level="2"
          text="La organización está en proceso de explorar actividades relacionadas con la transformación digital, aunque aún no ha definido procesos claros en esta área."
        />

        <Level
          className="text-red-color"
          hasArrow={false}
          level="1"
          text="La organización no ha iniciado ninguna forma de transformación digital."
        />
      </article>

      <article
        className="relative grid gap-1 px-4 py-6 text-xs font-bold text-center text-white border-2 rounded-full ml-36 justify-items-center place-content-center"
        id="thermometer"
      >
        {currentLevel && (
          <div
            className="absolute h-[708px] pt-6 pb-12 gap-2 text-xs font-normal bottom-36 text-gray-700 -left-[136px]"
            id="currentLevel"
            style={{ top: 0, bottom: 0 }}
          >
            <div className="relative flex gap-1" style={{ top: topPosition }}>
              <span className="max-w-[100px]">
                Nivel de madurez digital: {currentLevel}%
              </span>

              <Arrow width={32} />
            </div>
          </div>
        )}

        <div className="flex items-center justify-center w-24 h-32 rounded-t-full bg-gradient-to-b from-green-dark-color to-green-dark-color-dark bg-green-dark-color">
          De 81% a 100%
        </div>

        <div className="flex items-center justify-center w-24 h-32 bg-gradient-to-b from-green-light-color to-green-light-color-dark bg-green-light-color">
          De 61% a 80%
        </div>

        <div className="flex items-center justify-center w-24 h-32 bg-gradient-to-b from-yellow-color to-yellow-color-dark bg-yellow-color">
          De 41% a 60%
        </div>

        <div className="flex items-center justify-center w-24 h-32 bg-gradient-to-b from-orange-color to-orange-color-dark bg-orange-color">
          De 21% a 40%
        </div>

        <div className="w-24 h-6 bg-red-color"></div>
        <div
          className="grid w-32 rounded-full -mt-7 place-content-center aspect-square bg-gradient-to-b from-red-color to-red-color-dark bg-red-color"
          id="redLevel"
        >
          De 0% a 20%
        </div>
      </article>

      {/* // ? Desktop levels info */}
      <article className={desktopLevelsInfoClasses} id="levels">
        <Level
          level="5"
          text="La organización está inmersa en una cultura de transformación digital y está en constante evolución para mejorar su rendimiento digital."
        />

        <Level
          level="4"
          text="La organización ha comenzado a adoptar una visión digital, con varias iniciativas implementadas y aplicadas a sus operaciones."
        />

        <Level
          level="3"
          text="La transformación digital es reconocida como parte integral de la cultura organizacional."
        />

        <Level
          level="2"
          text="La organización está en proceso de explorar actividades relacionadas con la transformación digital, aunque aún no ha definido procesos claros en esta área."
        />

        <Level
          level="1"
          text="La organización no ha iniciado ninguna forma de transformación digital."
        />
      </article>
    </section>
  )
}

export { Thermometer }
