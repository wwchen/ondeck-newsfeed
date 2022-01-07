export type FeedEntry = { __typename: String } & (Announcement | User | Project);

export type Announcement = {
  id: string;
  title: string;
  body: string;
  fellowship: "fellows" | "angels" | "writers" | "all";
  created_ts: Date;
}

export type User = {
  id: string;
  name: string;
  bio: string;
  fellowship: "fellows" | "angels" | "writers";
  avatar_url: string;
  created_ts: Date;
}

export type Project = {
  id: string;
  name: string;
  description: string;
  icon_url: string;
  created_ts: Date;
}