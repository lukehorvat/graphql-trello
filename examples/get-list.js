import graphqlTrello from "../lib";

let query = /* GraphQL */`
  query($listId: String!) {
    getList(listId: $listId) {
      id
      name
      cards {
        id
        name
        url
        updatedAt
        comments
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
      }
    }
  }
`;

graphqlTrello({
  query,
  variables: { listId: process.env.TRELLO_LIST_ID },
  key: process.env.TRELLO_KEY,
  token: process.env.TRELLO_TOKEN,
}).then(data => {
  let list = data.getList;
  console.log(JSON.stringify(list, null, 2));
  process.exit();
}).catch(error => {
  console.error(error);
  process.exit(1);
});
