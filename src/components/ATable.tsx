import './ATable.scss'
import { Table, Select, InputNumber, Button, Pagination, Input } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import { checkAuth } from '@/utils'
import { useAppSelector } from '@/hooks/redux'

const { Option } = Select

type ATableProps = {
  config: ATableConfig,
  columns?: ColumnsType<any>,
  data?: any[],
  fetchData: (p?: any) => Promise<{ data: any[], total: number }>,
  fns: any,
  refresh?: boolean,
  setRefresh?: any,
  pagination?: boolean,
  defaultPager?: { page: number, size: number },
}

const ATable: React.FC<ATableProps> = (props) => {

  const defaultWidth = 150
  const [isLoading, setIsLoading] = useState<boolean>()
  const [tableData, setTableData] = useState<any>([])
  const [tableTotal, setTableTotal] = useState<number>(0)
  const [filter, setFilter] = useState<any>({})
  const [options, setOptions] = useState<any>({
    option1: [],
    option2: [],
    option3: [],
  })
  const [pager, setPager] = useState<TPager>({ page: 1, size: 20 })
  // const [currentPage, setCurrentPage] = useState<number>(1)
  const user = useAppSelector(state => state.user)

  useEffect(() => {
    if (props.defaultPager) setPager(props.defaultPager)
    setFilter({ ...props.config.filter })
    fetchData(false, props.defaultPager ? props.defaultPager : pager)
  }, [])

  useEffect(() => {
    if (props.refresh === true) fetchData(true, pager)
  }, [props.refresh])

  const fetchData = async (withFilter: boolean = false, pager?: Pager) => {
    props.setRefresh && props.setRefresh(false)
    setIsLoading(true)
    const p: any = {}
    if (props.pagination && pager) {
      p.page = pager.page
      p.size = pager.size
    }
    if (withFilter) {
      for (const key in filter) {
        if (filter[key] || filter[key] === false) p[key] = filter[key]
      }
    }
    const { data, total } = await props.fetchData(p)
    setIsLoading(false)
    setTableData(data ?? [])
    setTableTotal(total ?? 0)
  }

  const fetchDataWithFilter = () => fetchData(true)

  const resetFilter = () => {
    setOptions({
      option1: [],
      option2: [],
      option3: [],
    })
    setFilter({ ...props.config.filter })
  }

  const fetchOptions = async (fnName: string | undefined, optionName: string | undefined) => {
    if (!fnName || !optionName) return
    const fn = props.fns[fnName]
    const optionData = await fn()
    setOptions({ ...options, [optionName]: optionData })
  }

  const onPagerChange = (page: any, size: number) => {
    setPager({ page, size })
    fetchData(true, { page, size })
    // fetchData(true, newPager)
  }

  const filterOptions = props.config.filterOptions?.map((config, index) => {

    let inputElement = <></>

    switch (config.type) {
    case 'input':
      inputElement = (
        <Input
          value={filter[config.value]}
          placeholder={config.placeholder ?? ''}
          onChange={(e: any) => {
            setFilter({ ...filter, [config.value]: e.target.value })
          }}
        />
      )
      break
    case 'inputNumber':
      inputElement = (
        <InputNumber
          style={{ width: config.options?.width ?? defaultWidth }}
          key={config.value}
          min={config.options?.min ?? 0}
          max={config.options?.max ?? Number.MAX_SAFE_INTEGER}
          value={filter[config.value]}
          onChange={(e: any) => {
            setFilter({ ...filter, [config.value]: e })
          }}
        />
      )
      break
    case 'selector':
      if (config.dynamic) { // 动态下拉列表
        inputElement = (
          <Select
            style={{ width: config.options?.width ?? defaultWidth }}
            key={config.value}
            placeholder={config.placeholder ?? ''}
            value={filter[config.value]}
            popupClassName='a-select-popup'
            className='a-select'
            onChange={(e: any) => setFilter({ ...filter, [config.value]: e })}
            onDropdownVisibleChange={(open: boolean) =>
              open && fetchOptions(config.dynamic, config.optionName)}
          >
            { options[config.optionName as string].map((option: SelectorOptionConfig) =>
              <Option value={option.value} key={option.value}> { option.label } </Option>,
            ) }
          </Select>
        )
      } else inputElement = (
        <Select
          key={config.value}
          placeholder={config.placeholder ?? ''}
          value={filter[config.value]}
          onChange={(e: any) => setFilter({ ...filter, [config.value]: e })}
          style={{ width: config.options?.width ?? defaultWidth }}
          popupClassName='a-select-popup'
          className='a-select'
        >
          { (config.selections as SelectorOptionConfig[]).map((option: SelectorOptionConfig) =>
            <Option value={option.value} key={option.value}> { option.label } </Option>,
          ) }
        </Select>
      )
      break
    default:
      break
    }

    return (
      <div className='filter-item' key={index}>
        <div className='filter-label'> { config.label } </div>
        <div className='filter-input'>
          { inputElement }
        </div>
      </div>
    )
  })

  return (
    <div className='a-table-container'>
      <div className='filter-container'>
        { filterOptions }
        <Button onClick={resetFilter}> 重置 </Button>
        <Button type='primary' onClick={fetchDataWithFilter}> 查询 </Button>
      </div>
      { props.config.operation && (
        <div className='operation-container'>
          <div className='title'>
            { props.config.operation.title }
          </div>
          <div className='btns'>
            { props.config.operation.buttons && props.config.operation.buttons
              .filter(
                v => !v.auth || checkAuth(user!.auth, v.auth),
              )
              .map(v => (
                <Button key={v.label} onClick={() => props.fns[v.eventName]()}> { v.label } </Button>
              )) }
          </div>
        </div>
      ) }
      <div className='table-container'>
        <Table
          scroll={{ x: 1100 }}
          columns={props.config.table.columns}
          dataSource={tableData}
          pagination={false}
          loading={isLoading}
        />
        {
          props.pagination &&
          <Pagination
            showSizeChanger
            current={pager.page}
            defaultPageSize={pager.size}
            // pageSize={pager.size}
            onChange={onPagerChange}
            total={tableTotal}
            showTotal={total => `共 ${total} 条记录`}
            pageSizeOptions={[5, 10, 20, 50, 100]}
          />
        }
      </div>
    </div>
  )
}

export default ATable