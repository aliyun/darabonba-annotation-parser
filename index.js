'use strict';

const Lexer = require('./lib/lexer');
const Parser = require('./lib/parser');
const marked = require('marked');

function parse(source, filePath) {
  const lexer = new Lexer(source, filePath);
  const parser = new Parser(lexer);
  return parser.program();
}

function md2Html(mdText) {
  let htmlText = marked.parse(mdText).trimEnd();
  return htmlText;
}

module.exports = { 
  parse,
  md2Html 
};
