'use strict';

const { BaseParser } = require('@jacksontian/skyline');

const { Tag, tip } = require('./tag');

class Parser extends BaseParser {
  constructor(lexer) {
    super(lexer);
  }

  move() {
    this.look = this.lexer.scan();
  }

  tagTip(tag) {
    return tip(tag);
  }

  annotation() {
    this.match(Tag.START);
    const items = [];

    while (!this.is(Tag.END)) {
      if (this.is(Tag.TEXT)) {
        items.push({
          type: 'description',
          attrs: [],
          text: this.look
        });
        this.move();
      } else if (this.is(Tag.TYPE)) {
        var type = this.look;
        var item = {
          type: type.typeName,
          attrs: []
        };

        this.move();
        if (this.look.tag === '[') {
          this.move();

          while (this.look.tag === Tag.ID) {
            var attrName = this.look;
            this.move();
            this.match('=');
            var attrValue = this.look;
            this.match(Tag.ID);
            item.attrs.push({
              name: attrName,
              value: attrValue
            });
            if (this.look.tag === ',') {
              this.move();
            }
          }

          this.match(']');
        }

        if (type.typeName === 'param') {
          var name = this.look;
          this.match(Tag.ID);
          item.name = name;
        } else if (type.typeName === 'error') {
          var code = this.look;
          this.match(Tag.ID);
          item.code = code;
        }

        var text = this.look;
        this.match(Tag.TEXT);
        item.text = text;
        items.push(item);
      } else {
        this.error('expect "@xxx"');
      }
    }

    this.match(Tag.END);
    return {
      type: 'annotation',
      items: items
    };
  }

  program() {
    this.move();
    return this.annotation();
  }
}

module.exports = Parser;
