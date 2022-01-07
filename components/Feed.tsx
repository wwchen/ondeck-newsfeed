import * as t from '../types/feed'
import styled from 'styled-components'
import FeedEntry from './FeedEntry'
import InfiniteScroll from 'react-infinite-scroll-component';

type Props = {
  audience: string;
  entries: t.FeedEntry[];
  onLoadMore: () => Promise<unknown>
  hasMore: boolean;
}

const capitalize = (str: string) => str ? str[0].toLocaleUpperCase() + str.slice(1).toLocaleLowerCase() : '';

export default function Feed({ audience, entries, onLoadMore, hasMore }: Props) {
  return (
    <FeedContainer>
      <h1>{capitalize(audience)} Feed</h1>
      <InfiniteScroll
        dataLength={entries.length}
        next={onLoadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {entries.map(e => <FeedEntry entry={e} />)}
      </InfiniteScroll>
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