import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import Layout from 'components/Layout'
import Feed from 'components/Feed'
import * as t from 'types/feed'

const FEED_QUERY = gql`
  query GetFeed($audience: String!, $limit: Int!, $cursor: Date) {
    feed(audience: $audience, limit: $limit, cursor: $cursor) {
      __typename
      ... on Announcement {
        id
        title
        body
        fellowship
        created_ts
      }
      ... on User {
        id
        name
        bio
        fellowship
        avatar_url
        created_ts
      }
      ... on Project {
        id
        name
        description
        icon_url
        created_ts
      }
    }
  }
`

type QueryData = {
  feed: t.FeedEntry[];
}

type QueryVars = {
  audience: string;
  limit: number;
  cursor?: Date;
}

export default function FeedPage() {
  const { query } = useRouter()
  const audience = String(query.audience)
  const limit = 10;

  const { data, error, loading, fetchMore } = useQuery<QueryData, QueryVars>(
    FEED_QUERY,
    {
      variables: { audience, limit },
    }
  )
  const feed = data?.feed;

  if (!feed || loading || error) {
    return null
  }

  return (
    <Layout>
      <Feed audience={audience} entries={feed} onLoadMore={() => fetchMore({
        variables: {
          cursor: feed[feed.length - 1].created_ts
        },
      })} />
    </Layout>
  )
}
