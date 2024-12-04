import { Outlet } from 'react-router-dom'
import { Footer } from '@organisms/Footer/Footer'
import { Navbar } from '@organisms/Navbar/Navbar'

function Layout() {
  return (
    <>
      <Navbar />

      <main className="p-2 mx-auto md:p-4 max-w-7xl">
        <Outlet />
      </main>

      <Footer />
    </>
  )
}

export { Layout }
