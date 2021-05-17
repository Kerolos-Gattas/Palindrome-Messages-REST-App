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
