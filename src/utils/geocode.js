const request = require("postman-request");

const geocode = (address, callback) => {
  const mapboxURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiY2hpbngyNTA5IiwiYSI6ImNrbjkxZDc5bTEzZ2wyd282dHpibHZibmoifQ.ndBmFNlgJOBbtKzCPPn1IQ&limit=1";
  //console.log("Geocode URL:", mapboxURL);
  request({ url: mapboxURL, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to the geocode service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another location.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitue: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
