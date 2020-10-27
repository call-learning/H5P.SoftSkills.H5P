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

This is a H5P activity aimed at checking a student's softskills via the European Framework for SoftSkills
([eLene4Work](http://elene4work.eu/))
The questionnaire is editable via usual H5P. It was realised for [HESAM](https://www.hesam.eu/article-soka-un-projet-de-valorisation-des-soft-skills).

Cette activité H5P est destinée au test des Softskills pour les étudiants à travers le référentiel européen des compétences des soft skills 
([eLene4Work](http://elene4work.eu/)) . Le questionnaire est éditable via l'éditeur usuel H5P.
Réalisé pour l'[HESAM](https://www.hesam.eu/article-soka-un-projet-de-valorisation-des-soft-skills).

## Notes

This project was created using NWB as a react-component.

    nwb new react-component react-loading-button
    
We use the umd module type. 

The makefile at the root of folder is creating the H5P package itself.

Note also the use of .h5pignore for development purpose (this will help not to copy all
the files from node_modules folder for example in drupal development mode).


