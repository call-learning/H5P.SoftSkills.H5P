# H5P.SoftSkills - Development Notes

## General architecture of the H5P component

The base directory contains just a makefile that will collect all assets (the 
javascript module and attached files) and zip it into a h5p file.

The real H5P application is in the H5P.SoftSkills sub-folder and you will find the
usual semantics.json, library.json...
 
## Dependencies

This project depends on the following libraries:

* React (16.8) 
* Redux (for the questionnaire and global state of the application)
* React-Router (for routing in the results pages)
* Material UI (and icons)

Because the React bundled with React was not up to date (https://github.com/h5p/h5p-react),
we have, to avoid further dependencies, to bundle the full set of dependencies within 
the output (umd module). This is maybe not ideal and goes against some H5P policies
but as a first step and seen the size of the output bundle (less than 1Mb), this is a reasonable approach. If needed
this approach can be revisited later.

## Build tool

We have chosen NWB as a build tool instead of the usual Create React App as it was
enabling us to create independent UMD module (https://create-react-app.dev/docs/deployment/#publishing-components-to-npm).

There are specifics configurations setup for this project in the nwb.config.js:
   * nwb.config.js : Allowing to create an UMD module bundled with all the SVG files and needed
   material UI Icons.
   * We used storybook to develop components and visual identity for the site
   * NWB provides natively with Karma/Mocha test however Jest is now more and more used as an test tool for react project. Following
   the  indication (https://github.com/how-to-react/nwb-jest and here https://github.com/lewhunt/nwb-react-testing-library)
   we added jest a main test tool for this project. 
   It also has the advantage of having an external configuration that can easily picked up
   by IDE such as Webstorm (if not nwb will create the karma configuration but not export it).

## Tests

* Unit test 
* Component tests
* Lint  (react https://medium.com/@RossWhitehouse/setting-up-eslint-in-react-c20015ef35f7) ** TODO **
* Travis  ** TODO **

## Global Architecture

Here are few notes on some decision and ways we architected the application.

### Global architecture

Following the guidelines on React/Redux integration (https://redux.js.org/basics/usage-with-react and 
especially https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
 we divided our presentational components into to classes:
 
 * Containers: aware of Redux (and other things like Context for example)
 * Components : only aware of information provided via their props
 * Elements: are very small and used by components in several instances (like Atoms in
 Atomic Web Design)
 
In many ways we avoided to use stateful component, and most components are
stateless.
They use heavily Material UI and styles (components are all with Style) 

To avoid duplications most properties are defined in the utils/CommonProptypes.js.


### React Hooks and contexts

To avoid passing down information such as translation string, questionnaire content, 
context id, we are using the new Context feature from React (https://fr.reactjs.org/docs/context.html)
In many ways we did not want "Dumb" components to be aware of the context, so we wrapped it in 
entities such as Containers or H5PTranslatedText entity.

 
### H5P specifics

* Translation could be managed otherwise but to be consistent with other H5P applications
we used the "trick" of using a specific l10n parameter in the setup to add translated content
We then use the React Context to push this information down deep into the component structure.
* H5P file management: getLibraryPath needs a context ID which is also sent down to the
component via context

### Redux for global application state

Redux is used to store and manage
* Global application state (steps such as starting questionnaire, reviewing questions...)
* Store answers to questions
* Store position of the current page in the questionnaire 

#### Redux and Thunk

We use the traditional reducers so to keep the state of the application, and the question that
the user answered. We use the answers to then calculate the user's progress and display the graphs.

The reducers are in the "reducer" folder, actions are in the "actions" folder and action Types in
the constant/actionTypes.js file.

Thunk is used so to help with potentially chained actions (such as starting the questionnaire AND
reinitialising the questionnaire position). As states are managed in an independent manner (for example
currentStep is not aware of the values of navigation), thunk was a great way to reconcile and orchestrate
actions and maintain a consistent state across different subsections of the global state (see 
constants/initialState.js) whilst avoiding repetitive code.

### React Router for navigating into results

We used React Router to create navigation between different pages of the Results pages

### Styling and theming

The global theme definitions are located in questionnaireTheme.js.
We use Questionnaire.css to import the font definitions.
If a component overrides styles it is only for a local use and if repeated it should
be brought up into the theme.

### Note on the mockup and fontsize

* The normal font: 17px, line height 20px : body1
* Big Title top of the page: 36px, line height 48px : h3
* Title top of the page: 24, line height 29px: h4
* Title in the page (not underlined): 24px, line height 29px: subtitle1 
* Title in the page (underlined): 20px, line height 24px : subtitle2
* Important information: 20px, semi bold, line height 24px: body2

### Internationalisation

We did not use the H5P tool and just made the translation as we went along using
a specific React component that will handle i10n string (as per H5P).


    sort -u string.json  | cut -f 1 -d ':'  | tr -d '[ ]' | sed 's/\(.*\)/{"name":\1,"type":"text"}/'
