# Project Objective

Using Angular, build the client-side for an application called myFlix based on its existing server-side code (REST API and database), with supporting documentation using JSDocs to generate API documentation and TypeDocs for Angular documentation.

# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.4.

# Install:

Install latest version of Angular using cmd: npm install -g @angular/cli@latest
To customise UX, add Angular Material as a project dependency: ng add @angular/material

# To contribute to the TypeDoc Documentation:

Create a new config file typedoc.json in project folder

<!-- Paste the following in the config file (make sure you save the file after the changes);
{"entryPointStrategy": "expand",
  "entryPoints": ["./src/app"],
  "exclude": ["**/*.spec.ts", "**/*.module.ts", "**/*.e2e.ts", "**/*.index.ts"],
  "out": "./docs"} -->

Edit the script in package.json to the following: "typedoc": "typedoc --options typedoc.json"

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Technologies

Angular
Material Design
JSDoc (For API Documentation)
TypeDoc

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
