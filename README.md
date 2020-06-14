# H5P.SoftSkills

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe H5P.SoftSkills here.

This package is a questionnaire made for softskills (http://sa.elene4work.eu/selfassessment.php)
by HESAM (https://www.hesam.eu/)

 
[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

## Notes

This project was created using NWB as a react-component.

    nwb new react-component react-loading-button
    
We use the umd module type. 

The makefile at the root of folder is creating the H5P package itself.

Note also the use of .h5pignore for development purpose (this will help not to copy all
the files from node_modules folder for example in drupal development mode).

## TODO

* Use a library for react dependency (an updated version of https://github.com/h5p/h5p-react)

