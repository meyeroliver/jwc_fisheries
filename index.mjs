import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import passport from "passport";

import passportSetup from "./services/passport_setup.mjs";
import userController from "./controllers/user_controller.mjs";
import productController from "./controllers/product_controller.mjs";
import authController from "./controllers/auth_controller.mjs";
import {
  sessionCredentials
} from "./credentials.mjs";

import dbConn from "./services/mongo_db.mjs";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [sessionCredentials.cookieKey]
}));

/**
 * Initialize passport
 */
app.use(passport.initialize());
app.use(passport.session())

app.get("/", function (req, res) {
  res.send("Testing. Testing. Ground Control To Major Tom");
});

app.use("/auth", authController);
app.use("/user", userController);
app.use("/products", productController);

// custom 500 page
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Internal Server Error");
});

//Removes server details
app.disable("x-powered-by");

app.listen(PORT, () => {
  console.log(
    "Express started in " +
    app.get("env") +
    " mode on http://localhost:" +
    PORT +
    "; press Ctrl-C to terminate."
  );
});