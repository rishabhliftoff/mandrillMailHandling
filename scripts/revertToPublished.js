const updateMailsObj = require('./updateMails');
const mails = require('../mails.json');

/*
if some problem happens and you want to revert, use this script
this script is reverting to published code in mails.json and then publishing the mail template on mandrill
*/
const finalMails = mails.map((m) => {
  return {
    publish: true,
    name: m.name,
    code: m.publish_code,
  }
});

updateMailsObj.updateMails(finalMails);
