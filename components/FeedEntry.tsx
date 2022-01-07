import * as t from '../types/feed'
import styled from 'styled-components'
import FeedEntryAnnouncement from './FeedEntryAnnouncement'
import FeedEntryUser from './FeedEntryUser'
import FeedEntryProject from './FeedEntryProject'
import Card from './Card'

type Props = {
  entry: t.FeedEntry;
}

export default function FeedEntry({ entry }: Props) {
  return (
    <FeedEntryContainer>
      <Card>
        <Row>
          <ColumnLeft><strong>{entry.__typename}</strong></ColumnLeft>
          <ColumnRight>{entry.created_ts}</ColumnRight>
        </Row>
        <Row>
          {entryBlock(entry)}
        </Row>
      </Card>
    </FeedEntryContainer>
  )
}

const entryBlock = (entry: t.FeedEntry) => {
  switch (entry.__typename) {
    case "Announcement":
      return <FeedEntryAnnouncement announcement={entry as t.Announcement} />
    case "User":
      return <FeedEntryUser user={entry as t.User} />
    case "Project":
      return <FeedEntryProject project={entry as t.Project} />
    default:
      return styled.div`design needed`
  }
}

const FeedEntryContainer = styled.div``

const Row = styled.div`
display: flex;
flex-direction: row;
margin-bottom: 1rem;
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
  text-align: right;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`