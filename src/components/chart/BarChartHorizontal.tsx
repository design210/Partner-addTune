import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import styles from '@style/calculate/calculate.module.scss'
import { useTranslation } from 'react-i18next'
ChartJS.register(ChartDataLabels)
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const BarChartHorizontal = ({ graphData, label, color }: { graphData: Array<number>; label: Array<string>; color: string }): JSX.Element => {
  const { t } = useTranslation()
  const data = {
    labels: label,
    datasets: [
      {
        data: graphData,
        border: 0,
        backgroundColor: [],
        barThickness: 30,
      },
    ],
    hover: { mode: 'nearest' },
  }
  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
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
      },
      datalabels: {
        font: {
          weight: 700,
          size: 13,
        },
        align: 'start',
        anchor: 'end',
        formatter: (value: any) => {
          if (value !== null) {
            return `${value.toLocaleString()}${t('few')}`
          }
          return ''
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
  data.datasets[0].backgroundColor[index[0]] = color
  for (let i = 1; i < index.length; i++) {
    // @ts-ignore
    data.datasets[0].backgroundColor[index[i]] = '#E9EBED'
  }
  return (
    <section className={styles.chartBorder}>
      {
        // @ts-ignore
        <Bar data={data} options={options} width="433px" height="211px" />
      }
    </section>
  )
}

export default BarChartHorizontal
