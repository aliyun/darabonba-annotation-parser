'use strict';

const Lexer = require('./lib/lexer');
const Parser = require('./lib/parser');

exports.parse = function (source, filePath) {
  const lexer = new Lexer(source, filePath);
  const parser = new Parser(lexer);
  return parser.program();
};
