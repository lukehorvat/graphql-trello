import graphqlTrello from "../lib";

let query = /* GraphQL */`
  query($boardId: String!) {
    getBoard(boardId: $boardId) {
      id
      name
      url
      lists {
        id
        name
        cards {
          id
          name
          url
          updatedAt
          labels {
            name
            color
          }
          members {
            id
            username
            fullName
            avatarHash
          }
          comments {
            id
            content
          }
        }
      }
      members {
        id
        username
        fullName
        avatarHash
      }
    }
  }
`;

graphqlTrello({
  query,
  variables: { boardId: process.env.TRELLO_BOARD_ID },
  key: process.env.TRELLO_KEY,
  token: process.env.TRELLO_TOKEN,
}).then(data => {
  let board = data.getBoard;
  console.log(JSON.stringify(board, null, 2));
  process.exit();
}).catch(error => {
  console.error(error);
  process.exit(1);
});
