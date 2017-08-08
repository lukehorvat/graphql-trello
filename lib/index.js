import { graphql } from "graphql";
import schema from "./schema";
import resolver from "./resolver";
import Trello from "./trello";

export default function(options = {}) {
  let { query, variables, key, token } = options;
  let trello = new Trello(key, token);
  let context = { trello };

  return graphql(schema, query, resolver, context, variables).then(response => {
    let { data, errors } = response;
    if (errors) throw errors[0];
    return data;
  });
}
