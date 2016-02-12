'use strict';
const posthtml = require('posthtml');
const _ = require('lodash');
const Node = require('./lib/node');

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
      const result = process(new Node(node), {name: null});
      return result;
    });
  };
}

function process(node, scope) {
  if (node.hasClass()) {
    scope.name = node.hasScopeName(scopeNames) && node.scopeName;
  } else {
    if (aliasNames[node.tag] && !node.hasScopeClass(scope.name)) {
      node.classNames.push(`${scope.name}${token}${aliasNames[node.tag]}`)
    }
  }

  if (node.content) {
    const result = node.content.map((child) => {
      if (_.isObject(child)) {
        const node = new Node(child);
        return process(node, scope);
      } else {
        return child;
      }
    });
  }
  return node.own;
}
