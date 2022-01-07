import * as t from '../types/feed'
import Markdown from './Markdown'

type Props = {
  announcement: t.Annoucement;
}

export default function FeedEntryAnnouncement({ announcement }: Props) {
  return (
    <div>
      <h2>{announcement.title}</h2>
      <Markdown>{announcement.body}</Markdown>
    </div>
  )
}