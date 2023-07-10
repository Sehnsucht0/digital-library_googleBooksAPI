# digital-library_googleBooksAPI

 This project is made up by a front-end built in React and a back-end built with Express.
 
 Everything was written in TypeScript. 
 Session-based authentication was used through passport.js.
 A MongoDB database was used to store user data, and implemented with Mongoose.
 Express-validator was also used to prevent insecure user input.
 
 An .env file was provided for both the front-end and the back-end.
 This project can be easily built by using these .env files.
 The frontend only requires the input of the port to run it from and of the back-end server address.
 The back-end requires a MongoDB URI to store data, a session secret that can be freely chosen, the port to run on and the address of the front-end server.
 
 This project has also been setup to be used with Docker. It is only necessary to input the port mappings in the docker-compose.yaml file to launch it.
