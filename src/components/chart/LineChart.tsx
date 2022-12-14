import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const LineChart = ({ chartData }: { chartData: Array<number> }): JSX.Element => {
  const { t } = useTranslation()
  const data = {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    datasets: [
      {
        label: '',
        data: chartData,
        borderColor: 'rgba(4, 127, 255, 1)',
        backgroundColor: 'rgba(4, 127, 255, 1)',
      },
    ],
  }
  const options = {
    responsive: true,
    interaction: {
      mode: 'x' as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#E3E3E3',
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: function (context: any) {
          // Tooltip Element
          let tooltipEl = document.getElementById('chartjs-tooltip')

          // Create element on first render
          if (!tooltipEl) {
            tooltipEl = document.createElement('div')
            tooltipEl.id = 'chartjs-tooltip'
            tooltipEl.innerHTML = '<table></table>'
            document.body.appendChild(tooltipEl)
          }

          // Hide if no tooltip
          const tooltipModel = context.tooltip
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = String(0)
            return
          }

          // Set caret Position
          tooltipEl.classList.remove('above', 'below', 'no-transform')
          if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign)
          } else {
            tooltipEl.classList.add('no-transform')
          }

          function getBody(bodyItem: any) {
            return bodyItem.lines
          }

          // Set Text
          if (tooltipModel.body) {
            const titleLines = tooltipModel.title || []
            const bodyLines = tooltipModel.body.map(getBody)

            let innerHtml = '<thead>'

            titleLines.forEach(function (title: any) {
              innerHtml += '<tr><th></th></tr>' //????????? ??????
            })
            innerHtml += '</thead><tbody>'

            bodyLines.forEach(function (body: any, i: any) {
              let style = 'background: #047FFF'
              style += '; color:#fff'
              style += '; padding:2px 5px;'
              style += '; font-size:12px'
              style += '; font-weight:700'
              style += '; border-radius: 4px'
              innerHtml += '<tr><td><span style="' + style + '">' + body + t('won') + '</span></td></tr>'
            })
            innerHtml += '</tbody>'

            let tableRoot = tooltipEl.querySelector('table')
            tableRoot!.innerHTML = innerHtml
          }

          const position = context.chart.canvas.getBoundingClientRect()
          //const bodyFont = chart.helpers.toFont(tooltipModel.options.bodyFont);

          // Display, position, and set styles for font
          const offset = -30
          const offsetMinus = 50
          tooltipEl.style.opacity = String(1)
          tooltipEl.style.position = 'absolute'
          tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - offsetMinus + 'px'
          tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + offset + 'px'
          //tooltipEl.style.font = bodyFont.string;
          tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px'
          tooltipEl.style.pointerEvents = 'none'
          tooltipEl.style.width = '100px'
          tooltipEl.style.borderRadius = '100px'
        },
      },
      datalabels: {
        font: {
          size: 0,
        },
      },
    },
  }
  return (
    <>
      <Line options={options} data={data} width="1000px" height="252px" />
    </>
  )
}

export default LineChart
