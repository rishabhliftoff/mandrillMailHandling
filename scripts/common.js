const mails = require('../mails.json');

const listMailNames = () => {
  console.log('mails length: ', mails.length);
  mails.forEach((m) => console.log(m.name));
}

const getVariableStr = (variableName, templateType) => {
  if (templateType === 'handlebars') {
    return `{{${variableName}}}`;
  }
  return `*|${variableName}|*`;
}

module.exports = {
  listMailNames,
  getVariableStr,
}
