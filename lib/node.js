'use strict';

const _ = require('lodash');
const _node = new WeakMap();
const _scopeName = new WeakMap();
const _scopeToken = new WeakMap();

const relationWords = [
  'auto-class',
]

class Node {
  constructor(node) {
    node.attrs = node.attrs || {};

    _node.set(this, node);
    this.tag = node.tag;
    ((attrs) => {
      this.classNames = attrs.class ? attrs.class.split(/\s/) : [];
      this.autoClass = attrs['auto-class']
                       ? Number(attrs['auto-class']) ? true : false
                       : true;
    })(node.attrs);
  }

  get own() {
    const own = _node.get(this);
    if (this.classNames.length > 0) {
      own.attrs.class = this.classNames.join(' ');
    }
    own.attrs = _.omit(own.attrs, relationWords);
    return own;
  }

  get content() {
    return _node.get(this).content;
  }

  hasClass() {
    return this.classNames.length > 0;
  }

  get scopeName() {
    return _scopeName.get(this);
  }

  get scopeToken() {
    return _scopeToken.get(this);
  }

  hasScopeName(scopeNames) {
    let result = null
    for (let className of this.classNames) {
      for (let scopeName of scopeNames) {
        const idx = className.indexOf(scopeName);
        if (~idx) {
          result = getScope.call(this, className, idx);
          break;
        }
      }
      if (result != null) {
        _scopeName.set(this, result);
        return true;
      }
    }
    return false;
  }

  hasScopeClass(currentScopeName) {
    return this.classNames.some(n => new RegExp(currentScopeName).test(n));
  }
}

module.exports = Node;

function getScope(className, idx) {
  const prefix = className.slice(0, idx);
  return trim.call(this, prefix);
}

function trim(str) {
  return str.replace(/(?:-+|_+)$/, (matched) => {
    _scopeToken.set(this, matched);
    return '';
  });
}
