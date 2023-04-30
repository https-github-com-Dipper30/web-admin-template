/// <reference types="vite/client" />

interface ImgResponse {
  name: string,
  data: string,
  id: string,
  picType: string,
  type: string,
}

interface APIResponse<T> {
  code: number,
  msg: string,
  data: T,
}

type APIPromise<T> = Promise<APIResponse<T>>

interface SocketResponse<T> {
  code: number,
  msg: string,
  data: T,
}

interface SiderMenuItem {
  id: number,
  name: string,
  abbr: string,
  auth?: number[],
  icon?: any,
  path?: string,
  children?: SiderMenuItem[],
}

interface SiderSubMenuItem {
  id: number,
  name: string,
  abbr: string,
  auth?: number[],
  path?: string,
}
interface SearchBoxConfig {
  type: string,
  label: string,
  value: string,
  placeholder?: string,
  prop?: string,
  dynamic?: string,
  width?: number,
  selections?: SelectorOptionConfig[],
  optionName?: string,
  options?: any,
}

interface OperationConfig {
  title: string,
  buttons?: { label: string, eventName: string, auth?: number[] }[]
}

interface SelectorOptionConfig {
  value: any,
  label: string,
}

interface TableColumnConfig {
  title: string,
  dataIndex: string,
  key: string,
  width?: number,
  fixed?: string,
  render?: (...args) => JSX.Element,
}

interface TableConfig {
  indexed: boolean,
  columns: ColumnsType<any>,
}

interface ATableConfig {
  filter?: any,
  filterOptions?: SearchBoxConfig[],
  operation: OperationConfig,
  table: TableConfig,
}

interface ABreadCrumbConfig {
  route?: string,
  text: string,
}

interface Pager {
  page: number,
  size: number,
}