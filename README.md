# WomanHelp

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.19-3.

The project was created from Nov 5th, 2016 to Nov 7th, 2016 during the event.
I have added [auth0](https://auth0.com/) and [firebase](https://console.firebase.google.com/) , [angularfire2](https://github.com/angular/angularfire2), and [angular2-google-map](https://github.com/SebastianM/angular2-google-maps)
## Author
Yi Chiang
## Live Demo
I haven't applied https and thus geolocation is not functional in live site and I will fix phone picture's layout soon.

## Preview Website
![Admin View](/img/1.PNG)
![Demo Phone View](/img/2.PNG)
![Demo Phone View](/img/3.PNG)
![Demo Phone View](/img/4.PNG)
![Demo Phone View](/img/5.PNG)
![Auth0 View](/img/6.PNG)

## System Requirement
1. Install angular-cli globally.
`npm install -g angular-cli`

2.  Replace Firbase Key at `app.module.ts` with your own Key

```
export const firebaseConfig = {
  apiKey: "firebaseKey",
   authDomain: "YourProjectname.firebaseapp.com",
   databaseURL: "Your firebase LINK",
   storageBucket: "ProjectName.appspot.com"
};
```
3. Replace it with your Google map Key
at `app.module.ts`
```
imports:      [
    BrowserModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({ apiKey: 'Google Map Key'})
],
```
4. Auth0 apikey - `auth.cofig.ts`
```

export const myConfig: AuthConfiguration = {
    clientID: 'YourAuth0Key',
    domain: 'YourAuth0Domain.auth0.com'
};

```

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
