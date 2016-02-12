'use strict';
const posthtml = require('posthtml');
const _ = require('lodash');
const Node = require('./lib/node');

let scopeNames = [];
let aliasNames = {
  a: 'link',
  img: 'img',
  hr: 'hr',
  ul: 'list',
  li: 'item',
  dl: 'list',
  dt: 'term',
  dd: 'desc',
  code: 'code',
  pre: 'pre',
  blockquote: 'blockquote',
  form: 'form',
  label: 'label',
  input: 'input',
  select: 'select',
  button: 'btn',
  main: 'main',
  archive: 'archive',
  header: 'header',
  footer: 'footer',
  progress: 'progress',
};

module.exports = posthtmlAutoClass;

function posthtmlAutoClass(opts) {
  if (!opts) return flow;

  if (opts.scopeName === false) {
    scopeNames = [];
  } else {
    scopeNames = (opts.scopeNames || []);
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
    if (node.hasScopeName(scopeNames)) {
      scope.name = node.scopeName;
      scope.token = node.scopeToken;
    }
  } else {
    if (aliasNames[node.tag]
        && node.autoClass
        && !node.hasScopeClass(scope.name)) {
      node.classNames.push(`${scope.name}${scope.token}${aliasNames[node.tag]}`)
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
