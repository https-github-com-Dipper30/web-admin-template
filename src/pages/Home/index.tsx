import ALoader from '@/components/common/ALoader'
import APanel from '@/components/snippets/APanel'
import { useEffect, useMemo, useRef, useState } from 'react'
import { homeApi } from '@/api'
import { handleResult } from '@/utils'
import './index.scss'
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core'

// Import bar charts, all suffixed with Chart
import { BarChart, LineChart } from 'echarts/charts'

// Import the tooltip, title, rectangular coordinate system, dataset and transform components
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components'

// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from 'echarts/features'

// Import the Canvas renderer
// Note that including the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers'
import { generateDateByTs } from '@/utils/tools'

// Register the required components
echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LineChart,
])

let timer: any = null

const Home: React.FC<any> = () => {

  const [isLoading, setIsloading] = useState<boolean>(false)
  const [currentActiveUsers, setCurretnActiveUsers] = useState<TUserProfile[]>([])
  const dauChart = useRef<any>()
  const mauChart = useRef<any>()

  const [dau, setDau] = useState<number[][]>([])
  const [mau, setMau] = useState<number[][]>([])

  const dauOptions = useMemo(() => {
    const xData = dau.map(([ts, total]) => {
      return generateDateByTs(ts * 1000, 'MM-DD')
    })
    const yData = dau.map(([ts, total]) => total)
    return {
      xData,
      yData,
    }
  }, [dau])

  const mauOptions = useMemo(() => {
    const xData = mau.map(([ts, total]) => {
      return generateDateByTs(ts * 1000, 'M') + '月'
    })
    const yData = mau.map(([ts, total]) => total)
    return {
      xData,
      yData,
    }
  }, [dau])

  // const queryCurrentActiveUsers = useInterval(homeApi.getCurrentActiveUsers, 5000, [])
  useEffect(() => {
    timer = setInterval(() => {
      queryCurrentActiveUsers()
    }, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    initDiagram()
  }, [])

  const initDiagram = () => {
    queryDailyActiveUsers()
    queryCurrentActiveUsers()
    queryMonthlyActiveUsers()
    initDau()
    initMau()
  }

  const queryCurrentActiveUsers = async () => {
    const res = await homeApi.getCurrentActiveUsers()
    if (handleResult(res)) {
      setCurretnActiveUsers(res.data.users)
    }
  }

  const queryDailyActiveUsers = async () => {
    const res = await homeApi.getDailyActiveUsers()
    if (handleResult(res)) {
      setDau(res.data.dau)
    }
  }

  const queryMonthlyActiveUsers = async () => {
    const res = await homeApi.getMonthlyActiveUsers()
    if (handleResult(res)) {
      setMau(res.data.mau)
    }
  }

  const initDau = () => {
    if (!dauChart.current) dauChart.current = echarts.init(document.getElementById('daily-active-user') as HTMLElement)
    dauChart.current.setOption({
      xAxis: {
        type: 'category',
        data: dauOptions.xData,
      },
      yAxis: {
        type: 'value',
        splitLine: { show: false },
      },
      series: [
        {
          data: dauOptions.yData,
          type: 'bar',
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: 10,
            },
          },
          symbol: 'none',
          stack: 'a',
          areaStyle: {
            normal: {},
          },
        },
      ],
    })
  }

  const initMau = () => {
    if (!mauChart.current) mauChart.current = echarts.init(document.getElementById('monthly-active-user') as HTMLElement)
    mauChart.current.setOption({
      xAxis: {
        type: 'category',
        data: mauOptions.xData,
      },
      yAxis: {
        type: 'value',
        splitLine: { show: false },
      },
      series: [
        {
          data: mauOptions.yData,
          type: 'line',
          label: {
            show: true,
            position: 'top',
            textStyle: {
              fontSize: 10,
            },
          },
          symbol: 'none',
          stack: 'a',
          areaStyle: {
            normal: {},
          },
        },
      ],
    })
  }

  useEffect(() => {
    if (!dauChart.current) initDau()
    dauChart.current.setOption({
      xAxis: {
        data: dauOptions.xData,
      },
      series: [{
        data: dauOptions.yData,
      }],
    })
  }, [dauOptions])

  useEffect(() => {
    if (!mauChart.current) initDau()
    mauChart.current.setOption({
      xAxis: {
        data: mauOptions.xData,
      },
      series: [{
        data: mauOptions.yData,
      }],
    })
  }, [mauOptions])

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  const resize = () => {
    if (dauChart.current) dauChart.current.resize()
    if (mauChart.current) mauChart.current.resize()
  }

  return (
    <div className='home-page'>
      {
        isLoading && <ALoader size='large' />
      }
      {
        !isLoading && (
          <div>
            <APanel title='当前在线用户'>
              <div className='user-list'>
                <span className='count'>
                  { currentActiveUsers.length } 人
                </span>

              </div>
            </APanel>
            <APanel title='过去一周日活'>
              <div id='daily-active-user' className='graph' />
            </APanel>
            <APanel title='过去半年月活'>
              <div id='monthly-active-user' className='graph' />
            </APanel>
          </div>

        )
      }
    </div>
  )
}

export default Home