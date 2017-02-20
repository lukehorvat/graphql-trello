import graphqlTrello from "../lib";

let query = /* GraphQL */`
  query($memberId: String!) {
    getMember(memberId: $memberId) {
      id
      username
      fullName
      avatarHash
      cards {
        id
        name
        url
        updatedAt
        labels {
          name
          color
        }
        comments {
          id
          content
        }
      }
    }
  }
`;

graphqlTrello({
  query,
  variables: { memberId: process.env.TRELLO_MEMBER_ID },
  key: process.env.TRELLO_KEY,
  token: process.env.TRELLO_TOKEN,
}).then(data => {
  let member = data.getMember;
  console.log(JSON.stringify(member, null, 2));
  process.exit();
}).catch(error => {
  console.error(error);
  process.exit(1);
});
