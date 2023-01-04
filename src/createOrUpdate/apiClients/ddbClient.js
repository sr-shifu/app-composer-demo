const DynamoDb = require("aws-sdk/clients/dynamodb");

const ddbClient = new DynamoDb({
  ...(process.env.AWS_SAM_LOCAL === "true"
    ? { endpoint: process.env.DDB_ENDPOINT_URL }
    : {}),
});

module.exports = ddbClient;
