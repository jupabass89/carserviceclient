# Components

# car-list
List of cars related to their owner. In the case of unowned cars, 'No-owner' will appear where the owner's name would normally go.It is possible to click on the name of a car to go to the component car-edit and edit it. In the same way, you can click on an owner to go to the owner-edit component and edit or delete it.

# car-edit
In this component you can edit, add or delete a car. To edit or add, you have the OwnerDni field to relate it to an owner.
 
# owner-list
Here is a list of owners where you can select several with a checkbox to remove them. The edit button in front of each owner will allow you to enter the owner-edit component to edit or delete an owner.

# owner-edit
This component is responsible for adding, editing or deleting an owner with the name, ID and profession fields.

# Services

# car-service
This service handles the connection with the API for the / cars route and thus be able to handle the functions of creating, deleting and updating cars.

# owner-service
This service handles the connection to the API for the / owners path and thus be able to handle the functions of creating, deleting and updating owners.

--
# CarServiceClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
