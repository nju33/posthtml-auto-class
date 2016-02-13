'use strict';

const expect = require('chai').expect;
const posthtml = require('posthtml');
const html = require('fs').readFileSync('./test/index.html', 'utf-8');

describe('Node instance', () => {
  const Node = require('../lib/node');

  describe('className prop', () => {
    it('expect className is `[]`, when hasnt class', () => {
      const node = new Node({});
      expect(node.className).to.be.empty;
    })

    it('expect classNames is `[a, b]`, when class is `a b`', () => {
      const node = new Node({
        attrs: {class: 'a b'}
      });
      expect(node.classNames.length).to.equal(2);
      expect(node.classNames[0]).to.equal('a');
    });
  })

  describe('autoClass prop', () => {
    it('expect autoClass is `true`, when hasnt auto-class', () => {
      const node = new Node({
        attrs: {}
      });
      expect(node.autoClass).to.be.true;
    });
  });

  describe('scopeName when class is `foo-box` and scopeNames is `[box]`', () => {
    beforeEach(() => {
      this.node = new Node({
        attrs: {class: 'foo-box'}
      });
      this.node.hasScopeName(['box']);
    });

    it('expect scopeName is foo', () => {
      this.node.hasScopeName('')
      expect(this.node.scopeName).to.equal('foo');
    });

    it('expect scopeToken is -', () => {
      expect(this.node.scopeToken).to.equal('-');
    });
  });

  describe('export', () => {
    beforeEach(() => {
      this.node = new Node({
        attrs: {
          class: 'foo-box',
          'ac-ul': 'list',
          'ac-li': 'item',
          'auto-class': 'false',
        }
      });
    });

    it('expect attrs.size is 1', () => {
      this.node.aliasNames;
      expect(Object.keys(this.node.own.attrs).length).to.equal(1);
      expect(this.node.own.attrs['ac-ul']).to.be.undefined;
      expect(this.node.own.attrs['auto-class']).to.be.undefined;
    });
  });
});
