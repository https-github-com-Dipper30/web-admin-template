import { configApi } from '@/api'
import AAuthElement from '@/components/snippets/AAuthElement'
import { errorMessage, handleResult } from '@/utils'
import { Button, Checkbox, Col, Modal, Row, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect, useMemo, useState } from 'react'
import './CheckAuthModal.scss'
import { AuthCode } from '@/config/constants'

type CheckAuthModalProps = {
  visible: boolean
  userInfo: TUserRowInfo | undefined
  closeModal: () => void
  setRefresh?: (refresh: boolean) => void
}

const columns: ColumnsType<any> = [
  {
    title: '权限ID',
    dataIndex: 'id',
    key: 'id',
    width: 40,
    render: (id: number) => <span>{id}</span>,
  },
  {
    title: '权限名',
    dataIndex: 'name',
    key: 'name',
    width: 80,
    render: (name: string) => <span>{name}</span>,
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    width: 120,
    render: (description: string) => <span>{description}</span>,
  },
]

const CheckAuthModal: React.FC<CheckAuthModalProps> = props => {
  // const [auth, setAuth] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [allAuth, setAllAuth] = useState<TAuthRowInfo[]>([])
  const [newAuth, setNewAuth] = useState<number[]>([])

  const currentAuth = useMemo(() => {
    if (!props.userInfo) return []
    return props.userInfo.auth.map(a => ({ ...a, key: a.id }))
  }, [props.userInfo])

  useEffect(() => {
    if (!props.userInfo) {
      setNewAuth([])
    }
  }, [props.userInfo])

  useEffect(() => {
    if (!props.visible) {
      setIsEditing(false)
    }
  }, [props.visible])

  const changeEditingStatus = () => {
    if (isEditing) {
      setNewAuth([])
      setIsEditing(false)
    } else {
      fetchAllAuth()
      setNewAuth(currentAuth.map(a => a.id))
      setIsEditing(true)
    }
  }

  const fetchAllAuth = async () => {
    const res = await configApi.getAuths()
    if (handleResult(res)) {
      setAllAuth(res.data.auth)
    }
  }

  const onCheckAuth = (checkedAuth: any[]) => {
    setNewAuth(checkedAuth)
  }

  const onSubmit = async () => {
    // 参数校验
    if (!newAuth) {
      errorMessage('请勾选权限')
      return
    }
    setLoading(true)
    const res = await configApi.updateUserAuth({ uid: props.userInfo?.id as number, auth: newAuth })
    setLoading(false)
    if (handleResult(res)) {
      props.closeModal()
      props.setRefresh && props.setRefresh(true)
    }
  }

  const readOnlySection = (
    <>
      <div className="row">
        <div className="label"> 用户id </div>
        <div className="input">{props.userInfo?.id}</div>
      </div>

      <div className="row">
        <div className="label"> 用户名 </div>
        <div className="input">{props.userInfo?.username}</div>
      </div>

      <Table columns={columns} dataSource={currentAuth} pagination={false} />
    </>
  )

  const editSection = (
    <div className="auth-selector-list">
      <Checkbox.Group defaultValue={newAuth} style={{ width: '100%' }} onChange={onCheckAuth}>
        {allAuth.map(a => (
          <Row key={a.id}>
            <Col>
              <Checkbox value={a.id}>{`${a.name} # ${a.id}`}</Checkbox>
            </Col>
          </Row>
        ))}
      </Checkbox.Group>
    </div>
  )

  const footer = [
    <div key={1}>
      {isEditing ? (
        <Button type="primary" onClick={onSubmit}>
          确认修改
        </Button>
      ) : (
        <></>
      )}
    </div>,
  ]

  return (
    <Modal title="用户权限" open={props.visible} onCancel={props.closeModal} footer={footer}>
      <AAuthElement auth={[AuthCode.MODIFY_ACCOUNT]}>
        <Button className="edit-btn" loading={loading} onClick={changeEditingStatus}>
          {isEditing ? '取消修改' : '修改权限'}
        </Button>
      </AAuthElement>
      {isEditing ? editSection : readOnlySection}
    </Modal>
  )
}

export default CheckAuthModal
