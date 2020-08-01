# CSS MINIFY
![logo](https://github.com/DracotMolver/CSS-minify/blob/master/images/css-minify.jpg)

[![Build Status](https://travis-ci.org/DracotMolver/CSS-minify.svg?branch=master)](https://travis-ci.org/DracotMolver/CSS-minify)
[![Visual Studio Marketplace](https://img.shields.io/vscode-marketplace/d/DiegoMolina.css-minify.svg)](https://marketplace.visualstudio.com/items?itemName=DiegoMolina.css-minify)
[![Visual Studio Marketplace](https://img.shields.io/vscode-marketplace/v/DiegoMolina.css-minify.svg)](https://marketplace.visualstudio.com/items?itemName=DiegoMolina.css-minify)
[![license:mit](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)
![Coveralls github branch](https://img.shields.io/coveralls/github/DracotMolver/css-minify/master)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/DracotMolver/css-minify)

This is a very simple vscode extension. Takes your css file and minify it. It doesn't need any special configuration and it doesn't mess up your css file.
This tests are based on `Mocha` framework.

# How to
Just press `Ctrl|Cmd + F1|F2` and type `css minify`

## Features

* Removes the units from `0` values. *From `0px` to `0`*
* Removes the `0` from any float value. *From `0.16em` to `.16em`*
* Removes the last `;` from a closure.
* Removes useless white spaces.
* Reduce hexadecimals values. *From `#ffffff` to `#fff`*
* Removes single and double quotes.
* Replace `none` by `0`. (only in font-size-adjust, border and outline)

The extension will generate a new file with the the same name plus `min.css` and save it in the same folder of your css file you are minifying.

## Be aware of how you format your code
If you don't format your code well the extension won't work as espected.

* Don't do this
```css
-webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
```

* Do this
```css
-webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 3px 1px -2px rgba(0, 0, 0, 0.12),
                    0 1px 5px 0 rgba(0, 0, 0, 0.2);
```

* Don't do this
```css
@font-face {
    font-family: 'pxgrotesk-regular';
    src: url('pxgrotesk-regular.eot');
    src: url('pxgrotesk-regular.eot?#iefix') format('embedded-opentype'), url('pxgrotesk-regular.woff2') format('woff2'), url('pxgrotesk-regular.woff') format('woff'), url('pxgrotesk-regular.ttf') format('truetype'), url('pxgrotesk-regular.svg#svgFontName') format('svg');
}
```

* Do this
```css
@font-face {
    font-family: 'pxgrotesk-regular';
    src: url('pxgrotesk-regular.eot');
    src: url('pxgrotesk-regular.eot?#iefix') format('embedded-opentype'),
         url('pxgrotesk-regular.woff2') format('woff2'),
         url('pxgrotesk-regular.woff') format('woff'),
         url('pxgrotesk-regular.ttf') format('truetype'),
         url('pxgrotesk-regular.svg#svgFontName') format('svg');
}
```

* Don't do this
```css
.className, p > div, #id {
}
```

* Do this
```css
.className,
p > div,
#id {
}
```

Enjoy it :)
