import { useEffect } from 'react'
import { Anchord } from '@atoms/Anchord/Anchord'

const NotFound404 = () => {
  useEffect(() => {
    document.title = 'Diagnóstico - Página no encontrada'
  }, [])

  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen gap-4 p-2"
      id="not-found-page"
    >
      <h1 className="font-semibold">Oops!</h1>

      <p className="text-center">
        Error, la página a la que intentas acceder no existe.
      </p>

      <Anchord href="/inicio" text="Volver al inicio" />
    </section>
  )
}

export { NotFound404 }
