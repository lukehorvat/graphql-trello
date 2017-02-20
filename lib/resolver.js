class Query {
  getBoard(args, context) {
    return context.trello.getAsync(`/1/boards/${args.boardId}`)
    .then(board => new Board(board));
  }

  getList(args, context) {
    return context.trello.getAsync(`/1/lists/${args.listId}`)
    .then(list => new List(list));
  }

  getCard(args, context) {
    return context.trello.getAsync(`/1/cards/${args.cardId}`)
    .then(card => new Card(card));
  }

  getMember(args, context) {
    return context.trello.getAsync(`/1/members/${args.memberId}`)
    .then(member => new Member(member));
  }
}

class Board {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.url = data.url;
  }

  lists(args, context) {
    return context.trello.getAsync(`/1/boards/${this.id}/lists`)
    .map(list => new List(list));
  }

  members(args, context) {
    return context.trello.getAsync(`/1/boards/${this.id}/members`)
    .map(member => new Member(member));
  }
}

class List {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }

  cards(args, context) {
    return context.trello.getAsync(`/1/lists/${this.id}/cards`)
    .map(card => new Card(card));
  }
}

class Card {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.url = data.url;
    this.updatedAt = data.dateLastActivity;
    this.labels = data.labels.map(label => new Label(label));
  }

  members(args, context) {
    return context.trello.getAsync(`/1/cards/${this.id}/members`)
    .map(member => new Member(member));
  }

  comments(args, context) {
    return context.trello.getAsync(`/1/cards/${this.id}/actions`, { filter: "commentCard" })
    .map(comment => new Comment(comment));
  }
}

class Member {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.fullName = data.fullName;
    this.avatarHash = data.avatarHash;
  }

  cards(args, context) {
    return context.trello.getAsync(`/1/members/${this.id}/cards`)
    .map(card => new Card(card));
  }
}

class Comment {
  constructor(data) {
    this.id = data.id;
    this.content = data.data.text;
  }
}

class Label {
  constructor(data) {
    this.name = data.name;
    this.color = data.color;
  }
}

export default new Query();
