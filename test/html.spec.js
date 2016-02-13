'use strict';
const expect = require('chai').expect;
const posthtml = require('posthtml');
const autoClass = require('..');
const beautify = require('js-beautify').html;
const fs = require('fs');
const html = fs.readFileSync('./test/index.html', 'utf-8');
const expected = beatifyHtml(fs.readFileSync('./test/expect.html', 'utf-8'));

describe('result', () => {
  it('expect result html', () => {
    const result = posthtml([
      autoClass({
        scopeNames: ['box', 'block'],
        aliasNames: {
          ul: 'list',
          li: 'item',
          a: 'link',
        }
      })
    ]).process(html, {sync: true}).html;

    const beatified = beatifyHtml(result);
    expect(beatified).to.equal(expected);
  });
});

function beatifyHtml(html) {
  return beautify(html, {indent_size: 2});
}
