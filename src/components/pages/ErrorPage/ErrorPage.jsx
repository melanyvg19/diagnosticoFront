import { Anchord } from '@atoms/Anchord/Anchord'

const ErrorPage = () => {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen gap-4 p-2"
      id="error-page"
    >
      <h1 className="font-semibold">Oops!</h1>

      <p className="text-center">
        Se ha producido un error inesperado. Por favor, comuníquese con el
        administrador del sitio al siguiente correo:
      </p>

      <a
        className="font-semibold underline text-primary"
        href="mailto:temptech@cesde.edu.co"
      >
        temptech@cesde.edu.co
      </a>

      <Anchord href="/inicio" text="Volver al inicio" />
    </section>
  )
}

export { ErrorPage }
