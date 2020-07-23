'use strict';

const {
  Lexer: BaseLexer,
  Token
} = require('@jacksontian/skyline');

const {
  Tag
} = require('./tag');

class AnnotationStart extends Token {
  constructor() {
    super(Tag.START);
  }

  toString() {
    return 'AnnotationStart: /**';
  }
}

class AnnotationEnd extends Token {
  constructor() {
    super(Tag.END);
  }

  toString() {
    return 'AnnotationEnd: */';
  }
}

class Text extends Token {
  constructor(text) {
    super(Tag.TEXT);
    this.text = text;
  }

  toString() {
    return `Text: ${this.text}`;
  }
}

class ID extends Token {
  constructor(id) {
    super(Tag.ID);
    this.id = id;
  }

  toString() {
    return `ID: ${this.id}`;
  }
}

/***********************************************************
 * 功能:  判断c是否为字母(a-z,A-Z)
 * c:   字符值
 **********************************************************/
function isLetter(c) {
  return (c >= 'a' && c <= 'z') ||
    (c >= 'A' && c <= 'Z');
}

class Type extends Token {
  constructor(typeName) {
    super(Tag.TYPE);
    this.typeName = typeName;
  }

  toString() {
    return `Type: ${this.typeName}`;
  }
}

class Lexer extends BaseLexer {
  constructor(source, filename, position) {
    super(source, filename);
    this.inParam = false;
    this.inPropertyMode = false; // [] 匹配中
    this.inError = false;
  }

  scanID() {
    let id  = '';
    while (isLetter(this.peek) || this.peek === '_') {
      id += this.peek;
      this.getch();
    }

    return new ID(id);
  }

  scan() {
    this.skipWhitespaces();
    if (this.inParam) {
      if (isLetter(this.peek) || this.peek === '_') {
        this.inParam = false;
        return this.scanID();
      }

      throw new SyntaxError(`Unexpect token: '${this.peek}'`);
    }

    if (this.inError) {
      if (isLetter(this.peek) || this.peek === '_') {
        this.inError = false;
        return this.scanID();
      }

      throw new SyntaxError(`Unexpect token: '${this.peek}'`);
    }

    if (this.inPropertyMode) {
      if (this.peek === ']') {
        this.inPropertyMode = false;
        this.getch();
        return new Token(']');
      }

      if (this.peek === '=') {
        this.getch();
        return new Token('=');
      }

      if (this.peek === ',') {
        this.getch();
        return new Token(',');
      }

      if (isLetter(this.peek) || this.peek === '_') {
        return this.scanID();
      }

      throw new SyntaxError(`Unexpect token: '${this.peek}'`);
    }

    if (this.peek === '/') {
      this.getch();
      var next0 = this.peek;
      this.getch();
      var next1 = this.peek;
      if (next0 === '*' && next1 === '*') {
        this.getch();
        return new AnnotationStart();
      }
      this.ungetch();
      this.ungetch();
    }

    if (this.peek === '*') {
      this.getch();
      if (this.peek === '/') {
        this.getch();
        return new AnnotationEnd();
      }

      if (this.peek === ' ') {
        this.getch();
      }
    }

    if (this.peek === '[') {
      this.inPropertyMode = true;
      this.getch();
      return new Token('[');
    }

    if (!this.peek) {
      var tok = new Token(this.peek);
      this.peek = ' ';
      return tok;
    }

    if (this.peek === '@') {
      let typeName = '';
      this.getch();
      while (this.peek !== ' ' && this.peek !== '\n'
        && this.peek !== '[') {
        typeName += this.peek;
        this.getch();
      }

      if (typeName === 'param') {
        this.inParam = true;
      }

      if (typeName === 'error') {
        this.inError = true;
      }

      return new Type(typeName);
    }

    let str = `${this.peek}`;

    var lineEnd = false;
    for ( ; ; ) {
      this.getch();
      if (lineEnd) {
        while (this.peek === ' ') {
          this.getch();
        }

        if (this.peek === '*') {
          this.getch();
          if (this.peek === ' ') {
            this.getch();
            lineEnd = false;
          } else if (this.peek === '/') {
            this.ungetch();
            this.ungetch();
            break;
          }
        }

        if (this.peek === '@') {
          this.ungetch();
          break;
        }
      }

      if (this.peek === '\n') {
        lineEnd = true;
      }

      if (this.peek === '*') {
        this.getch();
        if (this.peek === '/') {
          this.ungetch();
          break;
        }

        this.ungetch();
      }

      if (this.peek) {
        str += this.peek;
      } else {
        throw new SyntaxError('Unexpect end of file');
      }
    }

    return new Text(str);
  }

}

module.exports = Lexer;
