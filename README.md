
Mandrill APIs: https://mandrillapp.com/api/docs/

you need to run fetchAllMails.js script to get all mails first

then when you want to update, you need to create array of whichever mails you want to update, with whatever values you want to update and supply it to updateMails function

you can use cheerio to manipulate mails html
here is an example:

```
function changeHeader (code) {
  const $ = cheerio.load(code);
  const image = $(`img[src='${oldLogoImg}']`);
  image.attr('src', newLogoImg);
  const parent = image.parent().parent();
  const parentTag = parent.get(0).tagName;
  if (parentTag === 'td') {
    const imageNewStyle = "width: 40%;\
      max-width: 300px;\
      min-width: 150px;";
    image.attr('style', imageNewStyle);
    const parentNewStyle = "text-align: center;\
    padding: 20px 5px 30px 5px;";
    parent.attr('style', parentNewStyle);
  }

  return $.html();
}
```

```
function changeFooter (code, templateType) {
  const $ = cheerio.load(code);
  const image = $(`img[src='${oldFooterLogoImg}']`);
  const imgele = image.get(0);

  if (imgele) {
    const parent = image.parent().parent().parent();
    parent.remove();
  }

  const webUrlStr = common.getVariableStr('webUrl', templateType);
  const currentYearStr = common.getVariableStr('CURRENT_YEAR', templateType);
  const companyNameStr = common.getVariableStr('companyName', templateType);
  const companyAddressStr = common.getVariableStr('companyAddress', templateType);

  const body = $('body');
  body.append('<section style="' +
    'padding-top: 40px;' +
    'padding-left: 5px;' +
    'padding-right: 5px;' +
  '">' +
    '<a href="' + webUrlStr + '" style="display: block;">' +
    	'<img src="' + newFooterImg + '" style="' +
         'display: block;' +
         'width:100%;' +
         'padding-bottom: 50px;' +
         'max-width: 375px;' +
         'margin: auto;' +
      '">' +
    '</a>' +
    '<div style="' +
  		'text-align: center;' +
  		'font-size:10px;' +
  		'letter-spacing: normal;' +
  		'color:#666666;' +
  	'">' +
    	'<em>Copyright &copy; ' + currentYearStr + ' ' + companyNameStr + ', All rights reserved.</em><br/>' +
    	'<br/>' +
    	'<strong>Our mailing address is:</strong><br/>' +
      companyAddressStr + '<br/><br/>' +
    '</div>' +
  '</section>');

  return $.html();
}
```

mandrill has 2 template types: mandrill and handlebars, based on which your variable code may change,
use function getVariableStr in common file.

while iterating through mail templates
I am not stopping the async function if some error occurs, instead I am logging it,
after the script is finished you can look at error mails and fix them

I am mainly updating code, if you need to update other things feel free to do so.

so a full update file will look like this:
```
const cheerio = require('cheerio');
const updateMailsObj = require('./updateMails');
const mails = require('../mails.json');

const filteredMails = mails.filter((m) => {
  return m.name === 'lead-list' || m.name === 'export-dispatch';
});

const newLogoImg = 'http://singhstation.net/wp/wp-content/uploads/2016/11/US-President-Donald-Trump.jpg';
const oldLogoImg = 'https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg';

function changeHeader (code) {
  const $ = cheerio.load(code);
  const image = $(`img[src='${oldLogoImg}']`);
  image.attr('src', newLogoImg);

  return $.html();
}

const finalMails = filteredMails.map((m) => {
  return {
    publish: false,
    name: m.name,
    code: changeHeader(m.publish_code),
  }
});

updateMailsObj.updateMails(finalMails);
```
