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


## H5P

### Packaging

H5P has some quirks that makes it difficult to install the library if ever some h5p.json / library.json settings
are not aligned.
The process for packaging is the following:

    cd H5P.SoftSkills
    npm run build
    cd ..
    < change versions in H5P.SoftSkills/library.json et h5p.json >
    make


### Installation in Moodle

#### Install the library (H5P.Softskill)

This will be needed to use the other packages, so you need as an admin to be able to access:
 Site administration > H5P > Manage H5P content types

Upload the h5p-softskills-libs.h5p, this package should appear in the "Installed H5P content types".

The library can now be used anywhere in Moodle.


#### Install the prebuilt content packages

Go to a content library (either in a course or in the system Content bank).
You can upload h5-softskills-bachelor-informational.h5p or h5-softskills-bachelor-transversal.h5p.

This will upload the package with the related content (questionnaire is already setup with content).


