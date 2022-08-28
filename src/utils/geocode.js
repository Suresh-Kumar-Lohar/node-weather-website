const request = require("request");

const geocode = (address, callback) => {
  // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'

  const url =
    "http://api.positionstack.com/v1/forward?access_key=e6c9b7228b928fe39e42c1275a016818&query=" +
    address;

  // https://api.positionstack.com/v1/forward?access_key=e6c9b7228b928fe39e42c1275a016818&query=sirohi

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.error) {
      if (response.body.error.code === "validation_error") {
        callback("Unable to find location. Try another search.", undefined);
      }
    } else if (response.body.data.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.data[0].latitude,
        longitude: response.body.data[0].longitude,
      });
    }
  });
};

module.exports = geocode;
