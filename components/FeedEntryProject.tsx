import * as t from '../types/feed'
import styled from 'styled-components'
import Card from './Card'
import Markdown from './Markdown'

type Props = {
  project: t.Project;
}

export default function FeedEntryProject({ project }: Props) {
  return (
    <Card>
      <Columns>
        <ColumnLeft>
          <Icon src={project.icon_url} />
        </ColumnLeft>
        <ColumnRight>
          <h2>{project.name}</h2>
          <Markdown>{project.description}</Markdown>
        </ColumnRight>
      </Columns>
    </Card>
  )
}

const Icon = styled.img`
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