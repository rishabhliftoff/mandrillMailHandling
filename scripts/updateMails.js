const request = require('request');
const async = require('async');
const config = require('../config');

function updateMailTemplate (mailObj, cb) {
  const bodyObj = { key: config.key, ...mailObj };
  if (!bodyObj.hasOwnProperty('publish')) {
    bodyObj.publish = false;
  }
  const options = {
    method: 'POST',
    url: `${config.baseUrl}templates/update.json`,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json'
    },
    body: bodyObj,
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) {
      console.log('error mail name: ', mailObj.name);
      console.log('error: ', error);
      return cb();
    }

    console.log("mail was updated");
    cb();
  });
}

const updateMails = (mailsArray) => {
  async.eachSeries(mailsArray, updateMailTemplate);
}

module.exports = {
  updateMails: updateMails,
}
