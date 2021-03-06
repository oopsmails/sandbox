# Ionic Tutorial

- Ref:

https://www.youtube.com/watch?v=5Gj4Y8zvl-s&list=PLlyAM-8-I7S9iNcZRfP4SQJhm4Mw5q5ku


## Ionic Tutorial #1 - Overview, installation and creating the project

ionic start ionic-plugins sidemenu

ionic serve

http://localhost:8100/folder/Inbox


## Ionic Tutorial #2 - Structure and open source project on github

## Ionic Tutorial #3 - First page with Ionic - Splashscreen web

ionic g page pages/loader

npm start

http://localhost:4200/loader


https://ionicframework.com/docs/components

https://ionicframework.com/docs/api/spinner

delete initially generated *folder* folder, fix errors.

ionic g page pages/login


## Ionic Tutorial #4 - Login and Registration pages - HTML and SCSS

https://ionicframework.com/docs/api/card

https://ionicframework.com/docs/api/input


https://ionicframework.com/docs/api/content

ion-content

CSS Custom Properties: --background


ionic g page pages/register

ion-radio-group

## Ionic Tutorial #5 - Using the Ionic components to build pages

ionic g page pages/home

https://ionicframework.com/docs/api/buttons  
Toolbar ::> ion-buttons

ion-list

ion-fab

ionic g page pages/pickup-call

ionic g page pages/pickup-calls

#5: 17:29 of 20:16


ionic g component components/pickup-call-card

## Ionic Tutorial #6 - Creating reusable custom components

#6: 20:50 of 22:39

- 20220219: Need catch up here

```
- ionic-plugins\src\app\components\pickup-call-card\pickup-call-card.component.html

define where to put *ng-content*

<ng-content select="[header]"></ng-content>
... ... other contents ... ...
<ng-content select="[footer]"></ng-content>


- ionic-plugins\src\app\pages\home\home.page.html, using ng-content

<app-pickup-call-card status="hold" updatedAt="25/04/2021 16:29" createdAt="24/04/2021"
notes="we have two bags that are full, one with plastic and the other with glasses">
    <ion-card-header header> <----------------------------------- Here, pass in *header* content into component page
        <ion-card-subtitle>Last pickup call</ion-card-subtitle>
    </ion-card-header>
    <ion-button color="success" fill="clear" size="full" footer (click)="goToPickupCalls()">See all...</ion-button> <----------------------------------- Here, pass in *footer* content into component page
</app-pickup-call-card>

- ionic-plugins\src\app\pages\pickup-calls\pickup-calls.page.html, using *pickup-call-card.component*, but NOT using ng-content

<ion-content>
    <app-pickup-call-card status="hold" updatedAt="25/04/2021 16:29" createdAt="24/04/2021"
    notes="we have two bags that are full, one with plastic and the other with glasses"></app-pickup-call-card>

    <app-pickup-call-card status="processing" updatedAt="24/04/2021 10:00" createdAt="23/04/2021"
    notes="we have two bags that are full"></app-pickup-call-card>

    <app-pickup-call-card status="finished" updatedAt="23/04/2021 18:00" createdAt="22/04/2021" value="$ 10,00"></app-pickup-call-card>
</ion-content>

```

## Ionic Tutorial #7 - Page navigation with TDD

npm test

http://localhost:9876/

expect(true).toBeFalsy(); <---- to test around first for running

angular Testbed.get deprecated

router = TestBed.get(Router); ----> router = TestBed.inject(Router);


Use *fakeAsync* to simulate async, e.g, setTimeout call here, and use *tick(1500);* to wait the *setTimeout(..., 1000)* from *ionic-plugins\src\app\pages\loader\loader.page.ts*


## Ionic Tutorial #8 - Login Page #1 - Login form with Reactive forms


- 20220223: Need catch up here 
10:45, using LoginForm in Login Page




## Ionic Tutorial #9 - Error message component for form validation

ionic g component components/error-message


## Ionic Tutorial #10 - Starting with NGRX - Loading component

NGRX: Reactive State for Angular

State Tracking .... introducing Store !!!!!


npm install @ngrx/store --save

npm install @ngrx/store-devtools



Ionic Tutorial #13.4 - Register Page - Implementing side effects with Redux NGRX Effects

02:05 of 07:20, implement register() with NestJS and Firestore ????


- Register flow
27-Ionic Tutorial 136  Register Page  Setting home page as root after loginregistrationFHR

src\app\pages\register\register.page.spec.ts


27-Ionic Tutorial 136  Register Page  Setting home page as root after loginregistrationFHR

04:10 of 06:44, debugging using Redux plugin, example

05:30 of 06:44, need to remove Subscription of login page and register page once lands on home page!

- Using navController.navigateRoot

this.navController.navigateRoot('home'); <------------- by doing this, the Subscription will be destroyed!!!


28-Ionic Tutorial 137  Register Page  Getting address details with google autocompleteFHR


02:25 of 06:43, *@ViewChild* and *IonInput*

- Using autocomplete

```

- src\app\pages\register\register.page.ts

  ionViewDidEnter() {
    this.autocomplete.getInputElement().then((ref: any) => {
      const autocomplete = new google.maps.places.Autocomplete(ref);
      autocomplete.addListener('place_changed', () => {
        this.registerForm.setAddress(autocomplete.getPlace())
      })
    })
  }

```


29-Ionic Tutorial 138  Getting user address with Geolocation and Google maps geocodingFHR

- Get location by GPS
- Transform location into address
- Fill address form


https://ionicframework.com/docs/native/geolocation

npm install cordova-plugin-geolocation
npm install @ionic-native/geolocation
ionic cap sync

npm install @ionic-native/core


- v6
npm install cordova-plugin-geolocation 
npm install @awesome-cordova-plugins/geolocation 
ionic cap sync



http://localhost:4200/




http://localhost:4200/home

http://localhost:4200/pickup-calls


http://localhost:4200/loader

Reciclica



