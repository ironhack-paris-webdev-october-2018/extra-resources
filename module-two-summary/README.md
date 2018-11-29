# module-two-summary

An summary of the different things covered in module two including a list of different npm packages, what they do and how files link together.

created using [irongenerate](https://www.npmjs.com/package/iron-generator)

In module two we have learnt how to create a full stack application using Node. We used [Express](https://www.npmjs.com/package/express) as a framework and [handlebars](https://www.npmjs.com/package/handlebars) as a template engine.

## Things included in irongenerate

check the app.js file for some additional comments!

[dotenv](https://www.npmjs.com/package/dotenv) - loads environment variables from a .env file into `process.env`. Storing configuration in the environment separate from code

[body-parser](https://www.npmjs.com/package/body-parser) parses incoming request bodies in a middleware before your handlers which we can access using `req.body`. We need req.body when doing post requests.

[Express](https://www.npmjs.com/package/express) to use express you need to require it on every page.

[hbs](https://www.npmjs.com/package/hbs) is the framework that we use with node. To set it up, you must add `app.set('view engine', 'hbs');` If you are going to use partials, you need to register partials `hbs.registerPartials(__dirname + '/views/partials' [, callback]);`

[mongoose](https://www.npmjs.com/package/mongoose) allows us to connect with our database.

### MODEL FILES

When we are creating our models you need to import

```
const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
```

at the top of each document. Once you have created your model, you need to export it

```
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
```

"commentSchema" is the name of the schema. "Comment" is the name you want to export it as.

### BCRYPT

[bcrypt](https://www.npmjs.com/package/bcrypt) is what we use to secure the passwords. NEVER save the password directly in the database before encrypting. To use this you need to add `const bcrypt = require("bcrypt");` at the top of every file you are using it in.

### SESSIONS

in order to use [session](https://www.npmjs.com/package/express-session) (to store the sessions in the database) you need to install two addition npm packages and add them to the app.js file.

```
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);


app.use(
  session({
    secret: process.env.APPSECRET,
    saveUninitialized: true,
    resave: true,

    store: new mongoStore({ mongooseConnection: mongoose.connection })
  })
);
```

`connect-mongo` is used to store the session info in mongoDB.

the `secret` is a string that is different for every app. You should add it to the .env file.

### FLASH MESSAGES

to use [flash messages](https://www.npmjs.com/search?q=connect-flash) you need to install an additonal npm package.

```
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});
```

in order to use them on the page you need to include

```
{{>flash_messages}}
```
