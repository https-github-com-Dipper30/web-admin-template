import { Tag } from 'antd'
import { useEffect, useState } from 'react'

type UserTagProps = {
  role: { id: number, name: string },
}

const UserTag: React.FC<UserTagProps> = (props) => {

  const [color, setColor] = useState<string>('')

  useEffect(() => {
    if (props.role.id === 1) setColor('volcano')
    else if (props.role.id === 2) setColor('geekblue')
    else setColor('green')
  }, [props.role])

  return <Tag color={color}> { props.role.name } </Tag>
}

export default UserTag