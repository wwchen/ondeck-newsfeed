import * as t from '../types/feed'
import styled from 'styled-components'
import FeedEntryAnnouncement from './FeedEntryAnnouncement'
import FeedEntryUser from './FeedEntryUser'
import FeedEntryProject from './FeedEntryProject'

type Props = {
  entry: t.FeedEntry;
}

export default function FeedEntry({ entry }: Props) {
  return (
    <FeedEntryContainer>
      {entryBlock(entry)}
    </FeedEntryContainer>
  )
}

const entryBlock = (entry: t.FeedEntry) => {
  switch (entry.__typename) {
    case "Announcement":
      return <FeedEntryAnnouncement announcement={entry as t.Annoucement} />
    case "User":
      return <FeedEntryUser user={entry as t.User} />
    case "Project":
      return <FeedEntryProject project={entry as t.Project} />
    default:
      return styled.div`design needed`
  }
}

const FeedEntryContainer = styled.div``
