import * as t from '../types/feed'
import styled from 'styled-components'
import Card from './Card'
import Markdown from './Markdown'

type Props = {
  user: t.User;
}

export default function FeedEntryUser({ user }: Props) {
  return (
    <Card>
      <Columns>
        <ColumnLeft>
          <Avatar src={user.avatar_url} />
        </ColumnLeft>
        <ColumnRight>
          <h2>{user.name}</h2>
          <p>Fellowship: {user.fellowship}</p>
          <Markdown>{user.bio}</Markdown>
        </ColumnRight>
      </Columns>
    </Card>
  )
}

const Avatar = styled.img`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
`

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`