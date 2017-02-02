import { buildSchema } from "graphql";

export default buildSchema(/* GraphQL */`
  type Query {
    getBoard(boardId: String!): Board!
    getList(listId: String!): List!
    getCard(cardId: String!): Card!
    getMember(memberId: String!): Member!
  }

  type Board {
    id: String!
    name: String!
    url: String!
    lists: [List]!
    members: [Member]!
  }

  type List {
    id: String!
    name: String!
    cards: [Card]!
  }

  type Card {
    id: String!
    name: String!
    url: String!
    updatedAt: String!
    comments: Int!
    labels: [Label]!
    members: [Member]!
  }

  type Member {
    id: String!
    username: String!
    fullName: String!
    avatarHash: String
    cards: [Card]!
  }

  type Label {
    name: String!
    color: String!
  }
`);
