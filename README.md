# Q4Widgets

A collection of client-side widgets for the Q4 Web platform.


### Building, testing, deploying

This project uses a few tools to handle common tasks.
Use [npm](https://www.npmjs.com/) to install them: `npm install`

You will also need to install Grunt globally: `npm install -g grunt-cli`

Before committing changes to the code, run `grunt`.
This will automatically run unit tests, minify the JS files for production,
and build documentation.

Each widget has its own version number,
following the [semantic versioning](http://semver.org/) system.


### Tests

Tests live in the `spec/` folder, and are run with [Jasmine](https://jasmine.github.io).
Run `jasmine` or `grunt test` to execute them.
There's currently not a lot of test coverage, but the framework is in place
and you can check the existing files for examples of how to write more.

- Prerequisites

You will require bower_components to run unit tests.

Use 'npm install -g bower' to globall install bower
Run 'bower' on this project to download all prerequisites.

### Minified files

Use `grunt min` to minify the files.
Currently two copies of each widget will appear:
one with a versioned filename in the `dist/` folder,
and one without a version number in the `dist/latest/` folder.
Point to the first if you want a specific version of the widget,
or the second if you always want the latest version.


### Documentation

Use `grunt doc` to build documentation.
This appears in the `doc_html/` folder.
There is also an `index.html` in the root that redirects to this folder.
If you push to the `gh-pages` branch on GitHub,
the documentation will appear on GitHub Pages for this repo.

Templates are in the `jsdoc_template` folder.

Use `grunt build` to build both the minified files and the docs.

To push documention live git push origin master:gh-pages


### Deployment

Currently the `dist/` and `doc_html/` files are committed into the repo,
even though they really don't need to be.
Ideally, commits would just include changes to the source code,
and pushing them would trigger a continuous integration tool like Codeship
to run all the Grunt tasks and deploy the dist and doc files automatically.
We may go this way in the future, but for now, always run Grunt before committing,
and include all the resulting changes in the commit.
