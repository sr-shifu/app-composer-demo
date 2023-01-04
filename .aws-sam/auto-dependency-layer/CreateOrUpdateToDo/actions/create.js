const ddbClient = require("../apiClients/ddbClient");
const uuid = require("uuid");
const { ToDoItemMapper, ToDoItem } = require("sam-lambda-demo-models/ToDoItem");
const transformToModel = require("sam-lambda-demo-models/transform");

const mapper = new ToDoItemMapper(ddbClient);

const createToDo = async ({ title }) => {
  if (!title) {
    throw new Error(
      "InvalidParameterException: title attribute is not defined"
    );
  }
  const item = new ToDoItem();
  const now = Date.now();
  item.Id = uuid.v4();
  item.Title = title;
  item.CreatedAt = now;
  item.ModifiedAt = now;

  const persisted = await mapper.put(item);
  return transformToModel(persisted);
};

module.exports = createToDo;
