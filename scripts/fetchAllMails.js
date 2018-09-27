const request = require('request');
const fs = require('fs');
const config = require('../config');

/*
use this script to fetch all mail info from mandrill and store it in a file
*/

const options = {
  method: 'POST',
  url: `${config.baseUrl}templates/list.json`,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  },
  body: {
    key: config.key,
    label: ''
  },
  json: true,
};

request(options, function (error, response, body) {
  if (error) {
    console.log('error fetching all mails: ', error);
    throw new Error(error);
  }

  fs.writeFile("./mails.json", JSON.stringify(body), function(err) {
    if(err) {
      return console.log('error writing to file: ', err);
    }

    console.log("writing to file successful");
  });
});
