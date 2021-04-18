// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("postman-request");

const forecast = (latitude, longtitude, callback) => {
  const weatherStackUrl =
    "http://api.weatherstack.com/current?access_key=07f7b0e37ddc837a1862451f330c1fdd&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longtitude) +
    "&units=f";
  //console.log(weatherStackUrl);
  request({ url: weatherStackUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " but it feels like " +
          body.current.feelslike +
          " in " +
          body.location.name
      );
    }
  });
};

module.exports = forecast;
