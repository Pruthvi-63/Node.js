require("dotenv").config();
const express = require("express"); //importing express from package
const server = express(); //initialising the express server
const port = process.env.PORT || 8081; // creating a port for express to startr server

const { connectToDB } = require("./config/databaseConnection.js"); //connecting to database
connectToDB();
const { contactRouter } = require("./routes/contactRoutes.js"); //routes to perform crud actions on contact
const { userRouter } = require("./routes/userRoutes.js"); //routes to perform crud actions on user
const { errorHandler } = require("./middlewares/errorHandler.js"); //error handler middleware

server.use(express.json()); //making use of express.json to parse the req and res
server.use("/api/contacts", contactRouter); //using contactRouter to api end points
server.use("/api/users", userRouter); //using UserRouter to api end points
server.use(errorHandler);

server.listen(port, () => {
  console.log(`server Running on port ${port}`); //starting the express server on port specified
});
