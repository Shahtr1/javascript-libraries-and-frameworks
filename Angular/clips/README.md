# Clips

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.7.

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

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## FFMPeg Files

FFMPeg is split into two packages
1.  FFMPEG
2.  Core (WA) -> exports FFMPeg as a Web assembly file
    it loads file through http, stored in node_modules/@ffmpeg/core/dist
    by default files in node_modules are not publicly accessible through http
    
    we need those files, so modify angular.json's assets

    ```bash
    {
    "input": "node_modules/@ffmpeg/core/dist",
    "output": "node_modules/@ffmpeg/core/dist",
    "glob": "*"
    }
    ```
   
GLOB:
-  Angular installs this package for searching through folders 

## Web Workers

Scripts that run on different thread than the main thread
if a web worker had blocking code, it wont block main thread
A web worker dont have access to document.
sending data from main thread to web worker can take time
so SharedArrayBuffer was introduced

## SharedArrayBuffer
An object shared between the main thread and web workers.
Browsers turn this feature off because of some vulnerabilities 
but after patching they enabled it again.

To enable it, we need to add headers to responses

in angular.json

```bash
  "options": {
      "headers": {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "same-origin"
      }
  }
````
