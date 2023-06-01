// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Create the DynamoDB service object
AWS.config.update({region: 'us-east-1'});

const ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
  try {
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        "id": "id",
        "isolate": "isolate",
        "message": JSON.parse(event.Records[0].body).Message,
        "expiration": Math.round(Date.now() / 1000) + 600
      }
    };
    await ddb.put(params).promise();
    return { body: 'Success!' }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({message: "Error!"})
    };
  }
}