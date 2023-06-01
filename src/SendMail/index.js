// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

exports.handler = async (event) => {

  let message = event.Records[0].Sns.Message
  try {
    const params = {
      Destination: {
        ToAddresses: ["amazon@amazon.com"], // 메일 주소 변경
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: message,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Special Price",
        },
      },
      Source: "amazon@amazon.com", // 메일 주소 변경
    };

    const { MessageId } = await ses.sendEmail(params).promise();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ MessageId }),
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error send email" })
    }
  }
}