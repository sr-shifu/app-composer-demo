const DynamoDb = require("aws-sdk/clients/dynamodb");
const { ToDoItemMapper } = require("sam-lambda-demo-models/ToDoItem");
const transform = require("sam-lambda-demo-models/transform");

const ddbClient = new DynamoDb({
  ...(process.env.AWS_SAM_LOCAL === "true"
    ? { endpoint: process.env.DDB_ENDPOINT_URL }
    : {}),
});

const mapper = new ToDoItemMapper(ddbClient);

exports.handler = async () => {
  const iterator = mapper.scan();
  const todoItems = [];
  for await (const record of iterator) {
    todoItems.push(transform(record));
  }
  return {
    statusCode: 200,
    body: JSON.stringify(todoItems),
  };
};
