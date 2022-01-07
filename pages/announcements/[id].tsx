import { useRouter } from 'next/router'
import { useQuery, gql } from '@apollo/client'
import Layout from 'components/Layout'
import FeedEntryAnnouncement from 'components/FeedEntryAnnouncement'
import * as t from '../../types/feed'
import Card from 'components/Card'

const ANNOUNCEMENT_QUERY = gql`
  query announcement($id: Int!) {
    announcement(id: $id) {
      id
      title
      body
      fellowship
      created_ts
    }
  }
`

type QueryData = {
  announcement: t.Announcement;
}

type QueryVars = {
  id: number;
}

export default function AnnouncementPage() {
  const { query } = useRouter()

  const { data, error, loading } = useQuery<QueryData, QueryVars>(
    ANNOUNCEMENT_QUERY,
    {
      skip: !query.id,
      variables: { id: Number(query.id) },
    }
  )
  const announcement = data?.announcement;

  if (!announcement || loading || error) {
    return null
  }

  return (
    <Layout>
      <Card>
        <FeedEntryAnnouncement announcement={announcement} />
      </Card>
    </Layout>
  )
}
