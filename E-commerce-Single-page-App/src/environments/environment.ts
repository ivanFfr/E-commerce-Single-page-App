// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCyEd2xMIF8QocDaIIcDaRKLmzpC263TbI',
    authDomain: 'e-commerce-single-page-app.firebaseapp.com',
    databaseURL: 'https://e-commerce-single-page-app.firebaseio.com',
    projectId: 'e-commerce-single-page-app',
    storageBucket: 'e-commerce-single-page-app.appspot.com',
    messagingSenderId: '90777062058'
  }
};
