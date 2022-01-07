export type FeedEntry = { __typename: String } & (Annoucement | User | Project);

export type Annoucement = {
  title: string;
  body: string;
  fellowship: "fellows" | "angels" | "writers" | "all";
  created_ts: Date;
}

export type User = {
  name: string;
  bio: string;
  fellowship: "fellows" | "angels" | "writers";
  avatar_url: string;
  created_ts: Date;
}

export type Project = {
  name: string;
  description: string;
  icon_url: string;
  created_ts: Date;
}