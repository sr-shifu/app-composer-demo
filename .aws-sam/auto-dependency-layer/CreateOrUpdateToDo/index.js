const createToDoItem = require("actions/create");
const updateToDoItem = require("actions/update");

exports.handler = async (event) => {
  if (event.requestContext.httpMethod === "POST") {
    const newItem = await createToDoItem(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: newItem,
    };
  }

  if (event.requestContext.httpMethod === "PUT") {
    const id = event.pathParameters.id;
    const requestPayload = JSON.parse(event.body);
    const updatedItem = await updateToDoItem({ ...requestPayload, id });
    return {
      statusCode: 200,
      body: updatedItem,
    };
  }
  return {
    statusCode: 405,
    body: "Method not supported",
  };
};
