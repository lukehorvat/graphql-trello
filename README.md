# graphql-trello [![NPM version](http://img.shields.io/npm/v/graphql-trello.svg?style=flat-square)](https://www.npmjs.org/package/graphql-trello)

[GraphQL](http://graphql.org) interface to [Trello](https://trello.com)'s API.

## Installation

Install the package with NPM:

```bash
$ npm install graphql-trello
```

## Usage

Example:

```javascript
import graphqlTrello from "graphql-trello";

let query = `
  query($boardId: String!) {
    getBoard(boardId: $boardId) {
      id
      name
      lists {
        id
        name
        cards {
          id
          name
        }
      }
      members {
        id
        username
      }
    }
  }
`;

graphqlTrello({
  query,
  variables: { boardId: "TRELLO_BOARD_ID" },
  key: "TRELLO_KEY",
  token: "TRELLO_TOKEN",
}).then(data => {
  let board = data.getBoard;
  console.log(board);
}).catch(error => {
  console.error(error);
});
```

See the [examples](examples) directory for more!

## Related

Check out my other Trello packages:

- [create-trello-webhook](https://github.com/lukehorvat/create-trello-webhook)
- [delete-trello-webhook](https://github.com/lukehorvat/delete-trello-webhook)
- [verify-trello-webhook](https://github.com/lukehorvat/verify-trello-webhook)
- [get-trello-board](https://github.com/lukehorvat/get-trello-board)
