import { ApolloServer, gql } from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`
  scalar Date

  type Announcement {
    id: Int!
    fellowship: String!
    title: String!
    body: String!
    created_ts: Date!
    updated_ts: Date!
  }
  
  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    users: [User!]!
    created_ts: Date!
    updated_ts: Date!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    projects: [Project!]!
    created_ts: Date!
    updated_ts: Date!
  }

  union FeedEntry = User | Project | Announcement

  type Query {
    announcement(id: Int!): Announcement!
    announcements(fellowships: [String!]): [Announcement!]
    project(id: Int!): Project!
    projects: [Project!]
    user(id: Int!): User!
    users(fellowships: [String!]): [User!]
    feed(audience: String!): [FeedEntry!]
  }
`;


export const server = new ApolloServer({ typeDefs, resolvers })
