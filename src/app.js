//expressjs.com
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3001;
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//define paths for express config
console.log(__dirname);

const pathToDir = path.join("__dirname", "../public");
const viewsPath = path.join("__dirname", "../templates/views");
const partialsPath = path.join("__dirname", "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(pathToDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Use this site to get your weather!",
    name: "Belinda Dcosta",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Belinda Dcosta",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Belinda Dcosta",
  });
});

app.get("/weather-info", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      errorMessage: "You must enter an address to search!",
    });
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          errorMessage: "Cannot find geocode for address " + address,
        });
      }
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({
            errorMessage: "Cannot find forecast for address " + address,
          });
        }
        res.send({
          address: req.query.address,
          location: location,
          forecast: forecastdata,
        });
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found!",
    name: "Belinda Dcosta",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page Not Found!",
    name: "Belinda Dcosta",
  });
});

//listen is an asynchronous function.
app.listen(port, () => {
  console.log("Server is up on port ", port);
}); //will start up the express server
