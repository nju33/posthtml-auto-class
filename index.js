'use strict';
const posthtml = require('posthtml');
const _ = require('lodash');

let token = '__';

let scopeNames = [
  'box'
];

let aliasNames = {
  ul: 'list',
  li: 'item',
  a: 'link',
  img: 'img',
  button: 'btn',
  label: 'label',
  input: 'input',
  archive: 'archive',
  main: 'main',
  header: 'header',
  footer: 'footer',
  hr: 'hr',
  dl: 'list',
  dt: 'term',
  dd: 'desc',
  progress: 'progress',
  form: 'form',
  select: 'select',
  code: 'code',
  pre: 'pre',
  blockquote: 'blockquote',
};

module.exports = posthtmlAutoClass;

function posthtmlAutoClass(opts) {
  if (!opts) return flow;

  if (opts.aliasName === false) {
    scopeNames = {};
  } else {
    _.assign(scopeNames, (opts.scopeNames || {}));
  }

  if (opts.aliasNames === false) {
    aliasNames = {};
  } else {
    _.assign(aliasNames, (opts.aliasNames || {}));
  }

  if (opts.token != null) token = opts.token;

  return flow;

  function flow(tree) {
    tree.match({tag: 'body'}, (node) => {
      const result = process(node, {name: null});
      return result;
    });
  };
}

function process(node, scope) {
  if (hasClass(node)) {
    scope.name = getScopeName(node);
  } else {
    if (aliasNames[node.tag]) {
      if (!node.attrs) node.attrs = {};
      if (node.attrs) {
        if (!node.attrs.class) {
          node.attrs.class = `${scope.name}${token}${aliasNames[node.tag]}`
        }
      }
    }
  }

  if (node.content) {
    const result = node.content.map((child) => {
      if (_.isObject(child)) {
        return process(child, scope);
      } else {
        return child;
      }
    });
  }
  return node;
}

function hasAlias(tagName) {
  return aliasNames[tagName] ? aliasNames[tagName] : false;
}

function hasClass(node) {
  if (node.attrs != null) {
    if (node.attrs.class != null) return true;
  }
  return false;
}

function getClass(node) {
  return node.attrs.class;
}

function getScopeName(node) {
  const scopeName = getRelationClass(node);
  return scopeName;
}

function getRelationClass(node) {
  const classNames = node.attrs.class.split(/\s/);
  let target = null
  for (let className of classNames) {
    for (let scopeName of scopeNames) {
      const idx = className.indexOf(scopeName);
      if (~idx) {
        target = getScope(className, idx);
        break;
      }
    }
    if (target != null) break;
  }
  return target;

  function getScope(className, idx) {
    const prefix = className.slice(0, idx);
    return trim(prefix);
  }

  function trim(str) {
    return str.replace(/(?:-|__)$/, '');
  }
}
