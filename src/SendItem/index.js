// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
AWS.config.region = "us-east-1";
var sns = new AWS.SNS({apiVersion: '2012-11-05'})

exports.handler = async event => {  
  var params = {
      Message: JSON.parse(event.body).message,
      Subject: "Special Price",
      TopicArn: process.env.TOPIC_ARN
  };
  
  var text = await sns.publish(params).promise();  
  const response = {
        "statusCode": 200,
        "body": JSON.stringify(text),
        "isBase64Encoded": false
    };
  return response;
};