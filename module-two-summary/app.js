//allows access to the .env file. It is important to put all credentials in the .env file so that they are not published online
require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//express in a node framework.
const express = require("express");

//The small icon that appears in the browser tab
const favicon = require("serve-favicon");

//handlebars- template engine for express. There are other options but in class we learn hbs
const hbs = require("hbs");

const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

//connecting to the database. Add the variable to the .env file. You need to put exactly the same in the seed file when you want to input data to your database
mongoose
  .connect(
    process.env.DATABASE,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//the package.json is where all dependences are stored. when you clone a repo on github you need to do a 'npm install' to install them all locally. The npm install goes through the package.json so it knows what to install.
const app_name = require("./package.json").name;

const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

//node-sass-middleware recompiles the .scss `("sassy" css)` file for express based servers.
app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

//all aditional routers need to be added otherwise it won't work
const index = require("./routes/index");
app.use("/", index);

module.exports = app;
