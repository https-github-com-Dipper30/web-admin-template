import { Button, Popconfirm } from 'antd'
import './index.scss'
import UserTag from '../UserTag'
import type { ColumnsType } from 'antd/lib/table'
import { useState } from 'react'
import { configApi } from '@/api'
import { handleResult } from '@/utils'
import ABreadCrumb from '@/components/ABreadCrumb'
import ATable from '@/components/ATable'
import { generateDateByTs } from '@/utils/tools'
import CheckAuthModal from './CheckAuthModal'
import AddUserModal from './AddUserModal'
import { useNavigate } from 'react-router-dom'
import AAuthElement from '@/components/snippets/AAuthElement'
import { DeleteOutlined } from '@ant-design/icons'
import usePageCode from '@/hooks/usePageCode'
import { AuthCode, MenuPageCode } from '@/config/constants'
import useSiderMenu from '@/hooks/useSiderMenu'

const UserList: React.FC<any> = () => {
  const [refresh, setRefresh] = useState<boolean>(false)
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [checkAuthModalVisible, setCheckAuthModalVisible] = useState<boolean>(false)
  const [currentRow, setCurrentRow] = useState<TUserRowInfo>()
  const navigate = useNavigate()

  const [menu] = useSiderMenu()
  const breadcrumb = usePageCode(MenuPageCode.USER_LIST, menu)

  const columnsConfig: ColumnsType<any> = [
    {
      title: '',
      dataIndex: 'id',
      key: 'index',
      width: 50,
      fixed: 'left',
      render: (item: any, record: any, index: number) => <>{index + 1}</>,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (text: number) => <a>{text}</a>,
    },
    {
      title: '邮箱',
      width: 100,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '用户名',
      width: 100,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      render: (role: { id: number; name: string }) => <UserTag role={role} />,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      render: (ts: number) => <span> {generateDateByTs(ts, '20YY-MM-DD')} </span>,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 100,
      render: (creator: { id: number; username: string } | null) => (
        <>
          {creator ? (
            <span className='hoverable' onClick={() => onUserDetail(creator.id)}>
              {' '}
              {creator.username}{' '}
            </span>
          ) : (
            <> - </>
          )}
        </>
      ),
    },
    {
      title: '选项',
      key: 'options',
      width: 100,
      fixed: 'right',
      render: (row: TUserRowInfo) => (
        <div className='a-table-options'>
          <Button className='a-table-option-col' onClick={() => checkAuth(row)}>
            {' '}
            查看权限{' '}
          </Button>
          <AAuthElement className='a-table-option-col' auth={[AuthCode.LOGIN_ADMIN]}>
            <Popconfirm
              title='确认删除该用户吗?'
              onConfirm={() => deleteUser(row.id)}
              okText='确认'
              cancelText='点错了~'
            >
              <Button danger type='primary' shape='circle' icon={<DeleteOutlined />} />
            </Popconfirm>
          </AAuthElement>
        </div>
      ),
    },
  ]

  const config: ATableConfig = {
    filter: {},
    filterOptions: [
      {
        type: 'inputNumber',
        label: '用户id',
        value: 'id',
        options: {
          min: 0,
          defaultValue: null,
        },
      },
      {
        type: 'input',
        label: '用户名',
        value: 'username',
        placeholder: 'username',
        options: {
          defaultValue: '',
        },
      },
      {
        type: 'selector',
        label: '用户角色',
        placeholder: '选择角色',
        prop: 'id',
        value: 'rid',
        dynamic: 'getRoles',
        optionName: 'option1',
        options: {
          width: 200,
        },
      },
    ],
    operation: {
      title: '用户列表',
      buttons: [
        {
          label: '创建用户',
          eventName: 'showAddModal',
          auth: [AuthCode.CREATE_ACCOUNT],
        },
      ],
    },
    table: {
      indexed: true,
      columns: columnsConfig,
    },
  }

  const showAddModal = () => setAddModalVisible(true)

  const checkAuth = (row: TUserRowInfo) => {
    setCurrentRow(row)
    setCheckAuthModalVisible(true)
  }

  const getRoles = async () => {
    const roleOptions = await configApi.getRoleOptions(configApi.getRoles)
    return roleOptions
  }

  const fetchData = async (filter: any): Promise<{ data: any[]; total: number }> => {
    const res = await configApi.getUsers(filter)
    if (!handleResult(res)) return { data: [], total: 0 }
    else {
      const data = res.data.rows.map((v: any) => {
        v.key = v.id
        return v
      })
      const total = res.data.count
      return { data, total }
    }
  }

  const deleteUser = async (id: number) => {
    const res = await configApi.deleteUserById({ id })
    if (!handleResult(res)) {
      setRefresh(true)
    }
  }

  const onUserDetail = (id: number) => {
    navigate(`/user/${id}`)
  }

  return (
    <div className='user-list-page'>
      <ABreadCrumb config={breadcrumb} />

      <AddUserModal visible={addModalVisible} closeModal={() => setAddModalVisible(false)} setRefresh={setRefresh} />

      <CheckAuthModal
        visible={checkAuthModalVisible}
        userInfo={currentRow}
        closeModal={() => setCheckAuthModalVisible(false)}
        setRefresh={setRefresh}
      />

      <ATable
        config={config}
        fetchData={fetchData}
        refresh={refresh}
        setRefresh={setRefresh}
        pagination={true}
        fns={{
          showAddModal,
          getRoles,
        }}
      />
    </div>
  )
}

export default UserList
