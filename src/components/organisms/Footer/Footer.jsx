const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full text-white min-h-32 bg-dark-color">
      <ul className="flex items-center justify-center gap-8 p-2 mx-auto md:p-4 gap-y-10 min-h-32 max-w-7xl">
        <li className="ml-auto">
          <div className="flex flex-wrap items-center justify-center px-4 gap-x-3 gap-y-4">
            <img
              alt="Logo de TempTech"
              className="object-contain h-7 w-fit max-w-36"
              height={28}
              src="/socials/logo-temptech.webp"
              width={144}
            />

            <div className="hidden w-1 m-auto bg-white rounded-full sm:block aspect-square "></div>

            <img
              alt="Logo de Cesde blanco"
              className="object-contain h-5 w-fit max-w-36"
              height={28}
              src="/socials/cesde-logo.svg"
              width={144}
            />

            <div className="hidden w-1 m-auto bg-white rounded-full sm:block aspect-square "></div>

            <img
              alt="Logo de Comfama"
              className="object-contain h-7 w-fit max-w-36"
              height={28}
              src="/socials/logo-comfama.webp"
              width={144}
            />
          </div>

          <hr className="my-4 border-[1.5px]" />

          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="block text-sm text-center">
              © Copyright Cesde. Todos los derechos reservados
            </span>

            <ul className="flex items-center gap-2">
              <li className="transition-transform hover:scale-105">
                <a
                  href="https://www.facebook.com/Cesde/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="Logo de Facebook"
                    className="object-contain"
                    height={28}
                    src="/socials/facebook.svg"
                    width={28}
                  />
                </a>
              </li>

              <li className="transition-transform hover:scale-105">
                <a
                  href="https://www.instagram.com/somoscesde/?hl=es"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="Logo de Instagram"
                    className="object-contain"
                    height={28}
                    src="/socials/instagram.svg"
                    width={28}
                  />
                </a>
              </li>

              <li>
                <a
                  href="https://x.com/encesde"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="Logo de Twitter"
                    className="object-contain"
                    height={28}
                    src="/socials/twitter.svg"
                    width={28}
                  />
                </a>
              </li>

              <li className="transition-transform hover:scale-105">
                <a
                  href="https://co.pinterest.com/cesde/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="Logo de Pinterest"
                    className="object-contain"
                    height={28}
                    src="/socials/pinterest.svg"
                    width={28}
                  />
                </a>
              </li>

              <li className="transition-transform hover:scale-105">
                <a
                  href="https://www.youtube.com/c/SomosCESDE"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    alt="Logo de Youtube"
                    className="object-contain"
                    height={28}
                    src="/socials/youtube.svg"
                    width={28}
                  />
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li className="ml-auto">
          <img
            alt="Logo de Comfama"
            className="max-w-5"
            height={160}
            src="/socials/logo-vigilado-comfama.webp"
            width={18}
          />
        </li>
      </ul>
    </footer>
  )
}

export { Footer }
