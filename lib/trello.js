import Promise from "bluebird";
import Trello from "node-trello";
import throttle from "p-throttle";

export default class {
  constructor(key, token) {
    let trello = Promise.promisifyAll(new Trello(key, token));
    let throttledGet = throttle(::trello.getAsync, 100, 10000); // http://help.trello.com/article/838-api-rate-limits

    this.get = (...args) => Promise.resolve(throttledGet.apply(null, args));
  }
}
