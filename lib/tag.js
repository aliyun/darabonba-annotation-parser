'use strict';

exports.Tag = Object.freeze({
  START: 1,         // /**
  END: 2,           // */
  TEXT: 3,          // normal string
  TYPE: 4,          // @xxx
  ID: 5,
});

var TagTip = {};

Object.keys(exports.Tag).forEach((key) => {
  var value = exports.Tag[key];
  TagTip[value] = key;
});

exports.tip = function (tag) {
  return TagTip[tag];
};
