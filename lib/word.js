'use strict';

const {
  tip
} = require('./tag');

const { Token } = require('@jacksontian/skyline');

class Word extends Token {
  constructor(lexeme, tag) {
    super(tag);
    this.lexeme = lexeme;
  }

  toString() {
    return `word: ${this.lexeme} tag: ${tip(this.tag)}`;
  }
}

module.exports = Word;
