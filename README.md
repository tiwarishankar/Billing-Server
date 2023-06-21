# Billing-Server


## Directory Structure
The basic folder structure of the project is:
```
BILLING-SYSTEM
│
├─── controllers
│   ├── auth.js            // login and register function
|   ├── orderPlaced.js      // contain function for two api , get all order placed for admin , confirm order 
│   ├── productItems.js.     // contain function for CRUD of product 
│   ├── userProducts.js     // contain function for api like add-to-cart, remove-from-cart, clear-cart, checkout
│─── models
│   ├── OrdersPlaced.js.    // contain order placed with userid 
│   ├── ProductItems.js    // Product schema contain all product with name , price and product type
|   ├── User.js            // User schema contain user detail email and password
|   ├── UserProducts.js    // Schema to store all user cart product with UserId take userId from User Schema
│─── routes
│   ├── auth.js.         // login and register routes
|   ├── orderPlaced.js.   // contain api for confirm order and get all order placed
│   ├── productItems.js  // contain CRUD for product
│   ├── userProducts.js  // contain all user cart product with userId
│─── utils
│   ├── constants.js   // all constant of project are stored here
|   ├── error.js       // error file         
│   ├── totalBill.js.  // calculate total bill based on product types like service or product
│   ├── verifyToken.js  // contain function to authenticate user for calling api with JWT 
|   index.js
|   .gitignore
|   package-lock.json
|   package.json
|   yarn.lock
```
