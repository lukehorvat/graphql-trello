import { graphql } from "graphql";
import Trello from "node-trello";
import Promise from "bluebird";
import schema from "./schema";
import resolver from "./resolver";

export default function(options = {}) {
  let { query, variables, key, token } = options;
  let trello = Promise.promisifyAll(new Trello(key, token));
  let context = { trello };

  return graphql(schema, query, resolver, context, variables).then(response => {
    let { data, errors } = response;
    if (errors) throw errors[0];
    return data;
  });
}
