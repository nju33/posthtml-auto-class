const posthtml = require('posthtml');
const autoClass = require('..');
const beautify = require('js-beautify').html;
const html = require('fs').readFileSync('./test/index.html', 'utf-8');

posthtml([autoClass({
  scopeNames: ['box', 'block'],
  aliasNames: {
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
  }
})])
  .process(html)
  .then((result) => {
    console.log(beautify(result.html, {
      indent_size: 2
    }));
  });
