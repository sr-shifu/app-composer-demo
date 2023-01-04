const ddbClient = require("../apiClients/ddbClient");
const { ToDoItemMapper, ToDoItem } = require("sam-lambda-demo-models/ToDoItem");
const transformToModel = require("sam-lambda-demo-models/transform");

const mapper = new ToDoItemMapper(ddbClient);

const updateToDo = async (item) => {
  if (!item.id) {
    throw new Error("InvalidParameterException: id attribute is required");
  }
  const itemToUpdate = await mapper.getById(item.id);
  itemToUpdate.ModifiedAt = Date.now();
  itemToUpdate.Title = item.title;
  itemToUpdate.CompletedAt = item.isCompleted === true ? Date.now() : undefined;

  const persisted = await mapper.put(itemToUpdate);
  return transformToModel(itemToUpdate);
};

module.exports = updateToDo;
