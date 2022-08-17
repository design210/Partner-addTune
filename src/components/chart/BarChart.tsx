import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import styles from '@style/calculate/calculate.module.scss'
import { useTranslation } from 'react-i18next'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const BarChart = ({ graphData, label }: { graphData: Array<number>; label: Array<string> }): JSX.Element => {
  const { t } = useTranslation()
  const data = {
    labels: label,
    datasets: [
      {
        data: graphData,
        border: 0,
        backgroundColor: [],
        barThickness: 35,
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
              innerHtml += '<tr><th></th></tr>' //타이틀 없음
            })
            innerHtml += '</thead><tbody>'

            bodyLines.forEach(function (body: any, i: any) {
              let style = 'background: #474C51'
              style += '; color:#fff'
              style += '; font-size:12px'
              style += '; font-weight:700'
              style += '; padding:2px 5px;'
              style += '; border-radius: 4px'
              innerHtml += '<tr><td><span style="' + style + '">' + body + t('person') + '</span></td></tr>'
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
  const origin = graphData.concat()
  // @ts-ignore
  const index = []
  function calc(arr: any) {
    for (let i = 0; i < arr.length; i++) {
      let max = Math.max.apply(null, arr)
      let indexCalc = arr.indexOf(max)
      index.push(indexCalc)
      origin[indexCalc] = -1
    }
  }
  calc(origin)
  // @ts-ignore
  data.datasets[0].backgroundColor[index[0]] = '#FD767F'
  for (let i = 1; i < index.length; i++) {
    // @ts-ignore
    data.datasets[0].backgroundColor[index[i]] = '#CACDD1'
  }
  return (
    <>
      <div className={styles.unit}>
        {t('unit')} ({t('person')})
      </div>
      <Bar data={data} options={options} width="490px" height="305px" />
    </>
  )
}

export default BarChart
