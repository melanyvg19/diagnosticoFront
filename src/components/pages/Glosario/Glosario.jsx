import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Anchord } from '@atoms/Anchord/Anchord'
import { GetCanDoDiagnostic } from '@services/Cliente/GetCanDoDiagnostic.service'
import { GetGlosaryItems } from '@services/GetGlosaryItems.service'
import { GlosaryItem } from '@atoms/GlosaryItem/GlosaryItem'
import { GlosarySkeleton } from '@layouts/GlosarySkeleton/GlosarySkeleton'
import { PatchGlosaryItem } from '@services/Admin/PatchGlosaryItem.service'
import { ROLES } from '@utils/rolesPermissions.util'
import { Title } from '@atoms/Title/Title'
import glosaryItems from '@src/jsons/GlosaryItems.json'

const Glosario = () => {
  const [canDoDiagnostic, setCanDoDiagnostic] = useState(true)
  const [glosaryLoading, setGlosaryLoading] = useState(false)
  const [glosaryTerms, setGlosaryTerms] = useState(glosaryItems)
  const userRole = Cookies.get('userRole')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchGlosaryTerms = async () => {
      setGlosaryLoading(true)

      try {
        const response = await GetGlosaryItems()

        if (response.success) {
          setGlosaryTerms(response.data)
        }
      } catch (error) {
        console.error('Error fetching glosary items:', error)
      } finally {
        setGlosaryLoading(false)
      }
    }

    fetchGlosaryTerms()
  }, [])

  useEffect(() => {
    const fetchCanDoDiagnostic = async () => {
      try {
        const result = await GetCanDoDiagnostic()

        if (result.success) {
          setCanDoDiagnostic(!result.data?.isFinished)
        }
      } catch (error) {
        console.error('Error fetching can view results:', error)
      }
    }

    fetchCanDoDiagnostic()
  }, [])

  const handleSave = async (idGlosario, updatedData) => {
    try {
      const response = await PatchGlosaryItem(idGlosario, updatedData)

      if (response.success) {
        toast.success('Ítem actualizado correctamente')

        setGlosaryTerms((prevTerms) =>
          prevTerms.map((term) =>
            term.idGlosario === idGlosario ? { ...term, ...updatedData } : term
          )
        )
      }
    } catch (error) {
      console.error('Error updating glosary item:', error)

      toast.error('Error al actualizar el ítem')
    }
  }

  return (
    <section className="grid gap-8">
      {glosaryLoading && <GlosarySkeleton />}

      {!glosaryLoading && (
        <>
          <Title text="Términos clave que debes conocer" className="text-3xl" />

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {glosaryTerms.map(
              ({ nombreGlosario, textoGlosario, imagen, idGlosario }) => (
                <GlosaryItem
                  canEdit={userRole === ROLES.ADMIN}
                  id={idGlosario}
                  key={idGlosario}
                  onSave={(updatedData) => handleSave(idGlosario, updatedData)}
                  src={imagen}
                  text={textoGlosario}
                  title={nombreGlosario}
                />
              )
            )}
          </section>

          {canDoDiagnostic && (
            <div className="flex justify-center">
              <Anchord
                href="/nivel-madurez-digital"
                text="Iniciar diagnóstico"
              />
            </div>
          )}
        </>
      )}
    </section>
  )
}

export { Glosario }
