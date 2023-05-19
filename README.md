# ODFD APP

> App platform built with the MERN/MPRP/PERN stack & Redux for state management.

![screenshot](https://github.com/anapitalai/odfd-app-back-front/blob/main/uploads/odfd_image.jpg)

## Backend
- Modify the user Model, add a field if a user is signing up, is he/she a
  seller or a customer
## Structure and flow of Backend
- environment variable come from .env file
- DB connection-config/db.js ---------> server.js
- controller --------> routers --------> server.js

## Resource in the database that needs modelling,users,restaurants,bars,stalls,favourites
Mongoose is the Object Data Mapper that is used to communications with the Mongo DB
>> Entity Relationship Diagram
![ERD](https://github.com/anapitalai/odfd-app-back-front/blob/main/uploads/ERD.png)
### User Model

### Delete later
users:
- phoneNumber
- sex
- dateofbirth

restaurants/stalls/bars:
- entity_type
- location (gps/geocode)
- services
- features
- food_menu
- drinks_menu

menu:
- id
- name
- description
- serving_size
- rating

rating:
- id
- date_rated
- title
- comment
- user
- restaurant/bar/stall
- stars

### Users Model
- mobile ???
- sex ???
- dob ???
- name
- email
- password
- isAdmin
- timestamp
### Stalls Model
- name
- email
- password
- isAdmin
- timestamp
### Bars Model
- name
- email
- password
- isAdmin
- timestamp
### Restaurant Model
- user
- name
- image 
- service
- drinks_menu
- food_menu
- location
- features
- reviews
- rating
- numReviews
- timestamp

### Foods Model
- user
- name
- image
- brand
- category
- description
- reviews
- rating
- numReviews
- timestamp

### Product Model
- user
- name
- image
- brand
- category
- description
- reviews
- rating
- numReviews
- timestamp
### Orders Model
- user
- orderItems
- shippingAddress
- paymentMethod
- paymentResult
- taxPrice
- shippingPrice
- totalPrice
- isPaid
- paidAt
- isDelivered
- deliveredAt
- timestamp

## Using POSTMAN for testing
- create a new collection called ODFD Collection
- Create the requests
- Create environment variables
  

## Features
- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Note on Issues
Please do not post issues here that are related to your own code when taking the course. Add those in the Udemy Q/A. If you clone THIS repo and there are issues, then you can submit

## Usage

### ES Modules in Node

We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@example.com (Admin)
123456

anapitalai@example.com (Customer)
123456

cikosi@example.com (Customer)
123456
```


## License

The MIT License

Copyright (c) 2020 Traversy Media https://www.odfd.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
