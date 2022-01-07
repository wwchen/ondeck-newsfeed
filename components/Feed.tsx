import * as t from '../types/feed'
import styled from 'styled-components'
import FeedEntry from './FeedEntry'

type Props = {
  entries: t.FeedEntry[];
}

export default function Feed({ entries }: Props) {
  return (
    <FeedContainer>
      {entries.map(e => <FeedEntry entry={e} />)}
    </FeedContainer>
  )
}

const FeedContainer = styled.div`
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
`