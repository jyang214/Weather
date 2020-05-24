/**Jackie Yang CS375 Section:003
 * Creates a local server and serves files from our local(current) directory that listen to port 8080.
 * Create the endpoint of ./getweather that uses current coordinate, and stored ID and Key to create 
 * a new link to aerisapi to fetch current weather data.
 * Parses the JSON file for the 7 days forcast and sends the parsed JSON back as a response to this endpoint.
 */
/** Imports express and request*/
let express = require('express');
let request = require('request');   
/** Create an instance of express */
let app = express();
const port = 8080;

/** Serve images, CSS files, and JavaScript files in current directory '.' */
app.use(express.static("./"));

/** Creates a endpoint to /getweather */
app.get("/getweather", function(req,resp){
    /** Retrieve the id and key from json in parent directory */
    let x = require("../aeriskey.json");
    let lat = req.query.lat;
    let lon = req.query.lon;
    let id = x.id;
    let key = x.key;
    /** Creates a url to aseris that contains the weather data of current location */
    var url = `https://api.aerisapi.com/forecasts/${lat},${lon}?client_id=${id}&client_secret=${key}`;
    /** request for the Weather data(JSON) from the api */
    request(url,{ json: true }, function(err, respo , body){
        if (err){
            return console.log(err);
        };
        /** send a parsed JSON file cont00aining info of the weather over a period of time as a response */
        resp.send(body.response[0]);
    });
});

/** "Listen" on a port, tells OS to forward all events sent to the provided port to this application */
app.listen(port, function(){ console.log("Server started listening to port:8080...")});