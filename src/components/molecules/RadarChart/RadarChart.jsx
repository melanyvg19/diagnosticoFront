import { useRef, useEffect } from 'react'
import {
  Chart,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
  Title,
  Tooltip
} from 'chart.js'
import { CATEGORIES_NAMES } from '@utils/Questions.util'
import { RESULTS_MOCKS } from '@utils/mocks/MockResults.util'

const RadarChart = ({ scores, isResponsive = true }) => {
  const chartRef = useRef(null)

  const canvasClasses = isResponsive
    ? 'w-full max-w-xs m-4 aspect-square xs:max-w-md sm:max-w-xl lg:max-w-3xl dark:bg-white'
    : 'w-[736px] aspect-square m-4 dark:bg-white'

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d', { willReadFrequently: true })

    const splitTitle = (title) => {
      const words = title.split(' ')
      const firstPart = words.slice(0, 2).join(' ')
      const secondPart = words.slice(2).join(' ')

      return [firstPart, secondPart]
    }

    if (!ctx) return

    const filteredScore =
      scores.puntuaciones?.map((score) => score.puntuacionTotal) ||
      RESULTS_MOCKS

    const data = {
      labels: [
        CATEGORIES_NAMES.culturaOrganizacional,
        CATEGORIES_NAMES.personas,
        CATEGORIES_NAMES.infraestructura,
        CATEGORIES_NAMES.procesos,
        splitTitle(CATEGORIES_NAMES.marketingMix)
      ],
      datasets: [
        {
          label: 'Puntaje referencia: Cintel, 2023',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: [55, 52, 51, 44, 61],
          fill: true
        },
        {
          label: 'Puntajes de la empresa',
          backgroundColor: '#12239E',
          borderColor: '#12239E',
          borderWidth: 1,
          data:
            filteredScore.length > 0
              ? filteredScore
              : [null, null, null, null, null],
          fill: false
        }
      ]
    }

    Chart.register(
      Filler,
      Legend,
      LineElement,
      PointElement,
      RadarController,
      RadialLinearScale,
      Title,
      Tooltip
    )

    Chart.defaults.font.family = 'Montserrat'
    Chart.defaults.font.size = 20

    function roundRect(ctx, x, y, width, height, radius) {
      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.lineTo(x + width - radius, y)
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
      ctx.lineTo(x + width, y + height - radius)
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
      )
      ctx.lineTo(x + radius, y + height)
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
      ctx.lineTo(x, y + radius)
      ctx.quadraticCurveTo(x, y, x + radius, y)
      ctx.closePath()
    }

    const alwaysShowTooltip = {
      id: 'alwaysShowTooltip',
      afterDraw: (chart) => {
        const { ctx } = chart

        ctx.willReadFrequently = true

        ctx.save()

        chart.data.datasets.forEach((dataset, datasetIndex) => {
          chart.getDatasetMeta(datasetIndex).data.forEach((point, index) => {
            const { x, y } = point.tooltipPosition()

            const text = dataset.data[index]
            const textWidth = ctx.measureText(text).width
            const padding = 10
            const borderRadius = 10

            // Background
            if (dataset.label === 'Puntajes de la empresa') {
              ctx.font = '13px Montserrat'
              ctx.fillStyle = '#12239E'
              ctx.fillText(dataset.data[index], x - textWidth / 2 + 1, y - 15)
            } else {
              // Fondo rosado para los puntajes globales
              ctx.fillStyle = 'rgba(238, 43, 123, 0.8)'
              roundRect(
                ctx,
                x - (textWidth + padding) / 2 + 1,
                y - 34,
                textWidth + padding,
                30,
                borderRadius
              )
              ctx.fill()

              // triangle
              ctx.beginPath()
              ctx.moveTo(x, y)
              ctx.lineTo(x - 5, y - 5)
              ctx.lineTo(x + 5, y - 5)
              ctx.fill()
              ctx.restore()

              // text
              ctx.font = '13px Montserrat'
              ctx.fillStyle = 'white'
              ctx.fillText(dataset.data[index], x - textWidth / 2 + 1, y - 15)
            }
            ctx.restore()
          })
        })
      }
    }

    const radarChart = new Chart(ctx, {
      type: 'radar',
      data,
      options: {
        plugins: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: `Resultados ${(filteredScore.reduce((acc, curr) => acc + curr, 0) / filteredScore.length).toFixed(0)}%`,
            color: '#ee2b7b',
            font: {
              size: 24
            }
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          r: {
            max: 100,
            suggestedMax: 100,
            suggestedMin: 0,
            pointLabels: {
              font: {
                size: 16
              },
              padding: 10
            },
            ticks: {
              stepSize: 20
            }
          }
        }
      },
      plugins: [alwaysShowTooltip]
    })

    return () => {
      radarChart.destroy()
    }
  }, [scores])

  return (
    <canvas
      aria-label="Gráfica de radar con el nivel de madurez digital"
      className={canvasClasses}
      height={896}
      ref={chartRef}
      role="img"
      width={896}
    >
      <p>Gráfica de radar con el nivel de madurez digital</p>
    </canvas>
  )
}

export { RadarChart }
