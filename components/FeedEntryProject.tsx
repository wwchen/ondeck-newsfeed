import * as t from '../types/feed'
import styled from 'styled-components'
import Markdown from './Markdown'
import Link from 'next/link'

type Props = {
  project: t.Project;
}

export default function FeedEntryProject({ project }: Props) {
  return (
    <Columns>
      <ColumnLeft>
        <Icon src={project.icon_url} />
      </ColumnLeft>
      <ColumnRight>
        <h2><Link href={`/projects/${project.id}`}>{project.name}</Link></h2>
        <Markdown>{project.description}</Markdown>
      </ColumnRight>
    </Columns>
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