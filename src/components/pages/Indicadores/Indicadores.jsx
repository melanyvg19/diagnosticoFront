import { models } from 'powerbi-client'
import { PowerBIEmbed } from 'powerbi-client-react'
import { useEffect, useState, useRef } from 'react'
import Cookies from 'js-cookie'
import { GetAllSupervisorClients } from '@services/Supervisor/GetAllSupervisorClients.service'
import { ROLES } from '@utils/rolesPermissions.util'
import './Indicadores.css'

const Indicadores = () => {
  const [clientesAsociados, setClientesAsociados] = useState([])
  const [lastUpdated, setLastUpdated] = useState(Date.now())
  const reportRef = useRef(null)
  const userRole = Cookies.get('userRole')

  useEffect(() => {
    const fetchEmpresasAsociadas = async () => {
      try {
        const response = await GetAllSupervisorClients()

        if (response.success) {
          setClientesAsociados(response.data)
        }
      } catch (error) {
        console.error('Error al obtener las empresas asociadas:', error)
      }
    }

    fetchEmpresasAsociadas()
  }, [])

  useEffect(() => {
    const applyFiltersIfNeeded = () => {
      if (reportRef.current && clientesAsociados.length > 0) {
        applyFilters(reportRef.current)
      }
    }

    const interval = setInterval(() => {
      if (reportRef.current) {
        reportRef.current.refresh().then(() => {
          setLastUpdated(Date.now())
          applyFiltersIfNeeded()
        })
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [clientesAsociados])

  const applyFilters = (report) => {
    if (!clientesAsociados || clientesAsociados.length === 0) return

    const filters = clientesAsociados.map(({ empresa }) => ({
      $schema: 'http://powerbi.com/product/schema#basic',
      target: {
        table: 'diagnostico empresa',
        column: 'nombre_empresa'
      },
      operator: 'In',
      values: [empresa]
    }))

    setTimeout(() => {
      report
        .setFilters(filters)
        .catch((error) => console.error('Error al aplicar filtros:', error))
    }, 100)
  }

  return (
    <>
      <section className="grid">
        {(userRole === ROLES.ADMIN || clientesAsociados.length > 0) && (
          <>
            <PowerBIEmbed
              embedConfig={{
                type: 'report',
                id: '31139d8e-4779-4869-9716-e6c4034f8766',
                embedUrl:
                  'https://app.powerbi.com/reportEmbed?reportId=31139d8e-4779-4869-9716-e6c4034f8766&groupId=33ffc41b-8255-4a8d-8374-b23a114f7e2e&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d',
                accessToken:
                  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCIsImtpZCI6IktRMnRBY3JFN2xCYVZWR0JtYzVGb2JnZEpvNCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZGZlYjFkNjQtMmM4My00MzRhLWJmMjEtYzY2OTZkNTMyMmVjLyIsImlhdCI6MTcyNTI4NTQ0OSwibmJmIjoxNzI1Mjg1NDQ5LCJleHAiOjE3MjUyODk2ODIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WEFBQUFuRzBpbmZaYittN2U0Y0ZqdzczRWp0TU1ldHZsMlhlcDJOWDQ2Y2I1cFR5MCtjdHczU2pMcUtBdlhKY2hwSFVHIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiVGVjaCIsImdpdmVuX25hbWUiOiJUZW1wIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiOC4yNDIuMTI0Ljc0IiwibmFtZSI6IlRlbXAgVGVjaCIsIm9pZCI6Ijk2N2Q2MmY0LTAzNWUtNDczNy05ZWFlLTE1ZDM1ZGY5ZjQwYiIsInB1aWQiOiIxMDAzMjAwMUIxM0E5NzI3IiwicmgiOiIwLkFRWUFaQjNyMzRNc1NrT19JY1pwYlZNaTdBa0FBQUFBQUFBQXdBQUFBQUFBQUFCUkFZMC4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzdWIiOiJxVmwxd2x5eHBkZGhlNUpFSEFYSG1URUh1WkFwbS0tRTIxOU5uYkI5NHJJIiwidGlkIjoiZGZlYjFkNjQtMmM4My00MzRhLWJmMjEtYzY2OTZkNTMyMmVjIiwidW5pcXVlX25hbWUiOiJUZW1wVGVjaEBjZXNkZS5lZHUuY28iLCJ1cG4iOiJUZW1wVGVjaEBjZXNkZS5lZHUuY28iLCJ1dGkiOiJCb00wMUxFTldrcVA5Ykpud3hlZkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2lkcmVsIjoiNiAxIn0.Nu3zLGhkVpatJjIXOfH0dR3aSMjF7vxvMFkoOyFhESpoFFiqXvm-0op2AvVODF6jdiUDHKgYbfFOlws8b3hif1qT_RH85BEjJKJBht5gMamWwRPP6XVeRWtKXFDrnS4oaxg2VH-HkrjD5va1Z1II-Bbm7H7xAV4j3O2qf0xC4iXJxLos8dXuzAxakAmfFJRdMhWyZAo3nZkFklVuZMHkPmjitICb_xjW8UET2-ND_ru5DvgKjSrbmDt2J_E6ZyUYow9lKPIZpTRPt_GiUeNfgW6JFlZyRpWXe1xJ8oIaxizIrwyVoLXuwzYrOP04sbOtX8KhniO1JF5Au1158mMqpQ',
                tokenType: models.TokenType.Aad,
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: false
                    }
                  },
                  background: models.BackgroundType.Transparent
                }
              }}
              cssClassName={'embed-container'}
              getEmbeddedComponent={(embeddedReport) => {
                console.log(embeddedReport)
                reportRef.current = embeddedReport
                applyFilters(embeddedReport)
              }}
            />

            <p>
              Última actualización: {new Date(lastUpdated).toLocaleTimeString()}
            </p>
          </>
        )}
      </section>
    </>
  )
}

export { Indicadores }
