# HTML Emails gulp project

A gulp project to help with creating HTML emails. Uses the [Ink framework](http://zurb.com/ink/)

Also gives you
* `SASS`
* Automaticaly inlines `CSS`
* Livereload (requires browser extension)
* Image minification

* * *

### Getting Started

Install [node](http://nodejs.org/) & [gulp](http://gulpjs.com/)

`brew install node`, `npm install -g gulp`

Install packages

`npm i`

Build assets (only required once)

`gulp build`

For development
(Starts local server, LiveReload, SASS compilation, image minification, & css inlining)

`gulp`

Inline styles for production

`gulp inliner`