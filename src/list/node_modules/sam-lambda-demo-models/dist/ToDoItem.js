const {
  DynamoDbSchema,
  DynamoDbTable,
  DataMapper,
} = require("@aws/dynamodb-data-mapper");

class ToDoItem {
  get [DynamoDbTable]() {
    return process.env.TABLE_NAME;
  }
  get [DynamoDbSchema]() {
    return {
      Id: {
        type: "String",
        keyType: "HASH",
      },
      Title: { type: "String" },
      CreatedAt: {
        type: "Number",
      },
      ModifiedAt: {
        type: "Number",
      },
      CompletedAt: {
        type: "Number",
      },
    };
  }
}

class ToDoItemMapper {
  constructor(client) {
    this.mapper = new DataMapper({
      client, // the SDK client used to execute operations
    });
  }
  scan() {
    return this.mapper.scan(ToDoItem);
  }
  getById(id) {
    const item = new ToDoItem();
    item.Id = id;
    return this.mapper.get(item);
  }
  put(item) {
    return this.mapper.put(item);
  }
  update(item) {
    return this.mapper.update(item);
  }
}

module.exports = { ToDoItem, ToDoItemMapper };
