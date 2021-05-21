# Palindrome-Messages-REST-App
Simple REST API service that handles palindrome messages.

This REST app is built with Typescript using node and express.js

The application stores messages that the user can add, update, get and delete from the server. 
All messages have an Id and a palindrome flag that specifies if the stored message is a palindrome or not.

# Architecture
A diagram of the architecture can be found under "docs\Palindrome App Architecture".

The application implements routes and middleware to ease the process of Requests.

The app first initializes the services required for the server to run. The app initialization handles the dependency injection so that each module/class is independent and to make it easier to test.

During the app initialization, routes are configured for the appropriate API endpoints. After that the server is listening for requests.

Once a request is received, the route handler will trigger the appropriate events. For most API calls the route will first reach out to the middleware to confirm that the request is valid.
If the request is invalid the middleware will respond with the appropriate error code and error message. If the request is validated, the flow will pass next to the controller that will handle processing the request.

The controller will retrieve the params required to process the request and then pass it along to a service to handle the operation.

The service will then operate on the data using the database and the models as necessary. 

Note: Currently the app is only using a JSON text file to store the data, database is not currently setup to make it easier to install and operate the app on its own.

The models will usually handle updating/operating on their own data.

Once the operation/update is processed through the services and models, the flow will go back to the controller and the controller will respond with the status and response body.

# Installing and Running the app
This app was developed using node, npm and typescript. You will need to install node, npm and typescript.

Once you clone the repo, navigate to the root of the repo and run `npm install`. This should install all the required packages.

The project is configured with the following `npm` commands:

`npm run watch-ts` will compile the application and watch for changes in files. If code changes are detected, the app will auto compile.

`npm run watch-node` will start the server.

`npm run watch` will start the server in watch mode. If code changes are detected, the app will auto compile and rerun the server instance. Recommended for development mode.

`npm run test` runs the unit tests. Note currently the unit tests do not cover all files.

For further testing, there are two postman test suites available under "test\Postman tests". These suites can be imported in postman directly and then you can run all the tests with one click in postman. For more info about how to run the test in postman please refer to the following: https://learning.postman.com/docs/running-collections/intro-to-collection-runs/

Postman suites details:

"plaindrome invalid request tests.postman_collection.json" this test suite runs a collection of requests that tests the API for invalid requests.

"plaindrome app tests.postman_collection.json" this test suite runs a collection valid API requests that tests all the various responses that the server can respond with. This test suite will create several message resources and manipulate them.

Note: both test suites need to be run on a clean server in order to pass the tests. To clean the server, do the following:

1- Delete JSON data file where the messages info is stored. The default location for that file is under "../data storage/data.json". The path for that file can be changed in the MessagesDataManager class

2- Restart the server

# API documentation


**Server Running**
----
  <This is the base request for the application>

* **URL**

  <http://localhost:3000/>

* **Method:**
  
  `GET`
  
*  **URL Params**
 
   `None`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** `Server running at http://localhost:3000:${port}`



**List All Messages**
----
  <This call will retrieve all messages along with their ids and palindrome>

* **URL**

  <http://localhost:3000/messages>

* **Method:**
  
  `GET`
  
*  **URL Params**
 
   `None`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** `{"messages": [ {Message 1}, {Message 2}, ... ]}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `The server encountered an error`



**Get Message By Id**
----
  <This API will get the message requested using the id supplied in the params>

* **URL**

  <http://localhost:3000/message/:messageId>

* **Method:**
  
  `GET` 
  
*  **URL Params**


   **Required:**
 
   `messageId=[integer]`

* **Success Response:**
  
  * **Code:** 200 OK<br />
    **Content:** `{ "id": [integer], "message": "[string]", "palindrome": [boolean] }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors: ['Invalid id'] }`
    
  OR
  
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors: ['Id must be a number'] }`

  OR
  
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `The server encountered an error`
    
* **Sample Call:**

  <http://localhost:3000/message/1> 



**Create Message**
----
  <This API will add a message resource to the list of messages>

* **URL**

  <http://localhost:3000/message>

* **Method:**

  `POST`
  
*  **URL Params**
 
   `None`

* **Data Params**

  BODY PAYLOAD
  
  <{ "message": "Message Content" }>

* **Success Response:**
  
  * **Code:** 201 CREATED<br />
    **Content:** `{ id : [integer] }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Missing message from request body`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `The server encountered an error`



**Update Message By Id**
----
  <This API updates a specific message using the id supplied in the params>

* **URL**

  <http://localhost:3000/message/:messageId>

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
 
   `messageId=[integer]`


* **Data Params**

  BODY PAYLOAD
  
  <{ "message": "Message Content" }>

* **Success Response:**
  
  * **Code:** 204 NO CONTENT<br />
    **Content:** ``
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors: ['Invalid id'] }`
    
  OR
  
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors: ['Id must be a number'] }`

  OR
  
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `Missing message from request body`  
  
  OR
  
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `The server encountered an error`

* **Sample Call:**

  <http://localhost:3000/message/1> 



**Delete Message By Id**
----
  <This API deletes a specific message using the id supplied in the params>

* **URL**

  <http://localhost:3000/message/:messageId>

* **Method:**
  
  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `messageId=[integer]`

* **Success Response:**
  
  * **Code:** 204 NO CONTENT<br />
    **Content:** ``
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors: ['Invalid id'] }`
    
  OR
  
  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ errors: ['Id must be a number'] }`
  
  OR
  
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `The server encountered an error`

* **Sample Call:**

  <http://localhost:3000/message/1> 
