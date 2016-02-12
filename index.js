'use strict';
const posthtml = require('posthtml');
const _ = require('lodash');
const Node = require('./lib/node');

let scopeNames = [];
let aliasNames = {};

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
  scope.aliasNames = scope.aliasNames || _.clone(aliasNames);

  if (node.hasClass()) {
    if (node.hasScopeName(scopeNames)) {
      scope.name = node.scopeName;
      scope.token = node.scopeToken;
      scope.aliasNames = _.assign(_.clone(scope.aliasNames), node.aliasNames);
    }
  } else {
    if (scope.aliasNames[node.tag]
        && node.autoClass
        && !node.hasScopeClass(scope.name)) {
      const _name = `${scope.name}${scope.token}${scope.aliasNames[node.tag]}`
      node.classNames.push(_name);
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
