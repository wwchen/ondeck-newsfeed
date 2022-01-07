import * as t from '../types/feed'
import styled from 'styled-components'
import FeedEntry from './FeedEntry'

type Props = {
  audience: string;
  entries: t.FeedEntry[];
  onLoadMore: () => Promise<unknown>
}

const capitalize = (str: string) => str ? str[0].toLocaleUpperCase() + str.slice(1).toLocaleLowerCase() : '';

export default function Feed({ audience, entries, onLoadMore }: Props) {
  return (
    <FeedContainer>
      <h1>{capitalize(audience)} Feed</h1>
      {entries.map(e => <FeedEntry entry={e} />)}

      <Button onClick={() => { onLoadMore() }}>Load more</Button>
    </FeedContainer >
  )
}

const FeedContainer = styled.div`
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 10px;
`
const Button = styled.button`
  width: 100%;
`