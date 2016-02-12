# Posthtml Auto Class

## Install

```
npm i posthtml-auto-class
```

## Usage

```js
const posthtml = require('posthtml');
const autoClass = require('posthtml-auto-class');
const beautify = require('js-beautify').html;
const html = require('fs').readFileSync('./index.html', 'utf-8');

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
  }
})])
  .process(html)
  .then((result) => {
    console.log(beautify(result.html, {
      indent_size: 2
    }));
  });

```

### Input

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>

  <div>

    <ul class="foo__box">
      <li><a href="#"></a></li>
    </ul>

    <ul class="foo2-block" ac-li="card">
      <li><a href="#"></a></li>
    </ul>

    <ul class="bar__box">
      <!-- when `auto-class` is `fasle`, doesn't add class  -->
      <li auto-class="false">
        <a href="#"></a>
      <li>
    </ul>

  <div>

</body>
</html>

```

### Output

```html
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>

<body>

  <div>

    <ul class="foo__box">
      <li class="foo__item">
        <a href="#" class="foo__link"></a>
      </li>
    </ul>

    <ul class="foo2-block">
      <li class="foo2-card">
        <a href="#" class="foo2-link"></a>
      </li>
    </ul>

    <ul class="bar__box">
      <!-- when `auto-class` is `fasle`, doesn't add class  -->
      <li>
        <a href="#" class="bar__link"></a>
      </li>
      <li class="bar__card">
      </li>
    </ul>

    <div>

    </div>
  </div>
</body>

</html>
```

## Options
|name|description|example|
|:--|:--|:--|
|scopeNames|Base for prefix class name|`['box']`|
|aliasNames|suffix class name of that|`{li: 'item'}`|

## Attributes
|name|description|example|
|:--|:--|:--|
|auto-class|Doesn't add class|`<span auto-class="false">`|
|`ac-*`|aliasNames for children tags|`<div ac-li="item">`|

## Change log
