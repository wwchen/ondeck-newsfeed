import * as t from '../types/feed'
import Markdown from './Markdown'

type Props = {
  announcement: t.Announcement;
}

export default function FeedEntryAnnouncement({ announcement }: Props) {
  return (
    <div>
      <h2>{announcement.title}</h2>
      <p>
        <Markdown>{announcement.body}</Markdown>
      </p>
    </div>
  )
}