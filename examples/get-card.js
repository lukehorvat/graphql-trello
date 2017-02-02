import graphqlTrello from "../lib";

let query = /* GraphQL */`
  query($cardId: String!) {
    getCard(cardId: $cardId) {
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
`;

graphqlTrello({
  query,
  variables: { cardId: process.env.TRELLO_CARD_ID },
  key: process.env.TRELLO_KEY,
  token: process.env.TRELLO_TOKEN,
}).then(data => {
  let card = data.getCard;
  console.log(JSON.stringify(card, null, 2));
  process.exit();
}).catch(error => {
  console.error(error);
  process.exit(1);
});
