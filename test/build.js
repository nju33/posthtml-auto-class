const posthtml = require('posthtml');
const autoClass = require('..');
const beautify = require('js-beautify').html;
const html = require('fs').readFileSync('./test/index.html', 'utf-8');

posthtml([autoClass({
  token: '__'
})])
  .process(html)
  .then((result) => {
    console.log(beautify(result.html, {
      indent_size: 2
    }));
  });
