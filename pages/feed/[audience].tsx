import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import Layout from 'components/Layout'
import Feed from 'components/Feed'
import * as t from 'types/feed'

const FEED_QUERY = gql`
  query GetFeed($audience: String!) {
    feed(audience: $audience) {
      __typename
      ... on Announcement {
        title
        body
        fellowship
        created_ts
      }
      ... on User {
        name
        bio
        fellowship
        avatar_url
        created_ts
      }
      ... on Project {
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
}

export default function FeedPage() {
  const { query } = useRouter()

  const { data, error, loading } = useQuery<QueryData, QueryVars>(
    FEED_QUERY,
    {
      variables: { audience: String(query.audience) },
    }
  )
  const feed = data?.feed;

  if (!feed || loading || error) {
    return null
  }

  return (
    <Layout>
      <Feed entries={feed} />
    </Layout>
  )
}
