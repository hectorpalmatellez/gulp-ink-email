# Experiments base

A base [gulp](http://gulpjs.com/) project for web experiments. By [Mark Durrant](https://twitter.com/m6_d6).

* * *

### getting started

Install [node](http://nodejs.org/) & [gulp](http://gulpjs.com/)

`brew install node`, `npm install -g gulp`

Install packages

`npm i`

Build assets (only required once)

`gulp build`

Run Gulp
(Starts local server, LiveReload, SASS compilation, JS hinting & minification, image minification)

`gulp`

### todo
* seperate dev & dist folders. (unminified assets + liveReload) & (minified assets +  no liveReload) - can use gulp-if for this I think.
* add in gh-pages export
* alert(sound) on errors
* style success/error msgs
* SASS only version?