import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import Layout from 'components/Layout'
import UserCard from 'components/UserCard'

const FEED_QUERY = gql`
  query GetFeed($audience: String!) {
    feed(audience: $audience) {
      __typename
      ... on Announcement {
        id
        title
        body
        fellowship
      }
      ... on User {
        id
        name
        bio
        fellowship
        avatar_url
      }
      ... on Project {
        id
        name
      }
    }
  }
`

type QueryData = {
  feed: FeedEntry[];
}

type QueryVars = {
  audience: string;
}

type FeedEntry = { __typename: String } & (Annoucement | User | Project);

type Annoucement = {
  id: number;
  title: string;
  body: string;
  fellowship: "fellows" | "angels" | "writers" | "all";
}

type User = {
  id: number;
  name: string;
  bio: string;
  fellowship: "fellows" | "angels" | "writers";
  avatar_url: string;
  projects: Project[];
}

type Project = {
  id: number;
  name: string;
  icon_url: string;
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
      {users.map(user => <UserCard user={user} />)}
    </Layout>
  )
}
