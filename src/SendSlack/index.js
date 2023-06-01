const https = require('https');

const doPost = (message) => {

// 본인 슬랙 정보로 변경 필요
  const data = {
    "channel": "#anycompany-slack",
    "username": "SpecialPrice_BOT",
    "text": message,
    "icon_emoji": ":sos:"
  };

  return new Promise((resolve, reject) => {
    const options = {
      host: 'hooks.slack.com',
      path: '/services/AWSAWSAWS', // 본인 슬랙 경로로 변경 필요
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      resolve(JSON.stringify(res.statusCode));
    });

    req.on('error', (e) => {
      reject(e.message);
    });
    
    req.write(JSON.stringify(data));

    req.end();
  });
};


exports.handler = async (event) => {
  let message = event.Records[0].Sns.Message
  await doPost(message)
    .then(result => console.log(`Status code: ${result}`))
    .catch(err => console.error(`Error doing the request for the event: ${JSON.stringify(event)} => ${err}`));
};