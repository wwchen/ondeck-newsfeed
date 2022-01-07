import * as t from '../types/feed'
import styled from 'styled-components'
import Card from './Card'
import Markdown from './Markdown'

type Props = {
  announcement: t.Annoucement;
}

export default function FeedEntryAnnouncement({ announcement }: Props) {
  return (
    <Card>
      <h1>{announcement.title}</h1>
      <i>{announcement.fellowship}</i>
      <Markdown>{announcement.body}</Markdown>
    </Card>
  )
}