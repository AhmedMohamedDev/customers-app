# Customer CRUD App with Vue, Vux and JWT Auth

This application is built using Vue, Vux and JWT Auth with a Laravel backend. It provides a simple way to manage customers with a simple interface.


### Installation

Clone the repository to your local machine
``git clone https://github.com/AhmedMohamedDev/customers-app``

Change into the project directory
``cd customers-app``

Install the dependencies

``npm install``

Run Server

`` ./vendor/bin/sail up``

Please note that this should run the migration but if you have any trouble please run ``./vendor/bin/sail artisan migrate``

## Admin Credentioals

Email : admin@email.com
Password : admin123

## Routes

#### Login  
http://localhost/admin

#### Dashboard 
`` http://localhost/dashboard ``

EndPoints

```
POST      api/customer ........................ CustomerController@store
PUT       api/customer ....................... CustomerController@update
DELETE    api/customer/{customer} ........... CustomerController@destroy
GET|HEAD  api/customers ................ CustomerController@allCustomers
POST      api/login ............................... AuthController@login
  
```
## Architecture

The application is based on the following architecture:

- Frontend: Vue.js and Vux
- Backend: Laravel
- State Management: Vuex
- Authentication: JWT with Cookies

## Folders Structure

The project consists of the following folders:

- `resources/js` contains all the Vue components.
- `app/Http/Controllers` contains all the controllers.
- `app/Http/Requests` contains all the validation rules.
- `app/Repositories` contains all the repository classes.

## Validation

Validation is done using Laravel's built-in validation system. The validation rules are stored in the `app/Http/Requests` folder.

## Repository Pattern

The application uses the repository pattern to separate the database logic from the rest of the application. The repository classes are stored in the `app/Repositories` folder.

![repo](https://blog.logrocket.com/wp-content/uploads/2022/02/repository-pattern-diagram.png)

## JWT Auth

JWT authentication is done using Laravel's built-in JWT package. The authentication is done using cookies for persistence.

![jwt](https://i.stack.imgur.com/0GAlG.png)

## Vuex

Vuex is a state management library for Vue.js applications. It provides a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.

![repo](https://miro.medium.com/v2/resize:fit:720/0*5BcWxyQW7ai1JsVd.gif)

In our app, we used Vuex to handle all CRUD actions related to the Customer entity. By centralizing the state in the store, we were able to ensure that the data was consistent throughout the application, and that any changes made in one component would be reflected in all other components that relied on that data. This made our code more organized, maintainable, and predictable. Additionally, we used Vuex to handle authentication by storing the authentication status and token in the store.

## Dispatching Emails

Upon successful creation of a customer, the system dispatches a welcome email to the customer asynchronously. This email serves as a confirmation of the customer's successful registration and provides a warm welcome to the system.

![dis](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rwosfraplff3jbd7wa08.png)

## Conclusion

This is a simple CRUD application that uses Vue, Vux, JWT Auth and Laravel to provide a user-friendly interface for managing customers. It uses the repository pattern to separate the database logic from the rest of the application, and JWT Auth with cookies for authentication.

