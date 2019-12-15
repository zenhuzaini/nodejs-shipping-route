const express = require("express");
const app = express();
const path = require('path')
const hbs = require('hbs')
const port = process.env.PORT || 3000;

const geocode = require("./utils/geocode.js");
const osrm = require("./utils/osrm_api.js");

const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))

const viewDirectory = path.join(__dirname, '../template/views')
app.set('view engine', 'hbs')
app.set('views', viewDirectory)

const setPartials = path.join(__dirname, '../template/partials')
hbs.registerPartials(setPartials)

//help variable 
let destination_save = [];
let source_save;

app.get('/', (req, res) => {
    //everytime it refreshes, it will be set null
    destination_save = [];
    source_save = ''

    res.render('homepage', { title: 'Shipping Route' })
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help' })
})

app.get("/easyroute", (req, res) => {

    if (destination_save === null || source_save === null) {
        return res.send("you must provide the destination and source");
    }

    //try to change the array object into 'Just' array
    //Creates a new array by manipulating the values in another array
    //the longitude and latitude has been retrieved before
    let result_destination = destination_save.map(
        a => a.longitude + "," + a.latitude
    );

    //Change the 'just array' into string that will be used for the address
    let final_destinations = ""; //to avoid undefined from the beginning
    result_destination.forEach((destination, index) => {
        if (index == result_destination.length - 1) {
            final_destinations = final_destinations + destination;
        } else {
            final_destinations = final_destinations + destination + ";";
        }
    });

    console.log("this is the ", final_destinations);
    if (final_destinations === null || source_save === null) {
        return res.send('you must set the destination and the source')
    }
    //call the osrm value
    osrm.osrm(Object.values(source_save).toString(), final_destinations, (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    }
    );
});

// /setsource/?source=address_wroclaw
// ex /setsource/?source=wroclaw
app.get("/setsource", (req, res) => {
    const source = req.query.source;
    if (!source) {
        return res.send("you must provide the source");
    }

    geocode.geocode(source, (err, result) => {
        if (err) {
            return res.send(err);
        }

        source_save = result;
        //console.log(source_save.longitude)
        const { longitude, latitude } = source_save;
        res.send({
            longitude: longitude,
            latitude: latitude
        });
    });
});

//it is used if we want to use the Mapbox API, so we can get the longitude and latitude value of inputted
//address
// /setdestination/?destination=address_wroclaw
// ex /setdestination/?destination=rynek wroclaw
//it can be run several times in order to get multiple destination
app.get("/setdestination", (req, res) => {
    const destination = req.query.destination;
    if (!destination) {
        return res.send("please insert the destination");
    }

    geocode.geocode(destination, (err, result) => {
        if (err) {
            return res.send(err);
        }
        console.log(result);
        destination_save.push(result);
        res.send(destination_save);
    });
});

//this route is used to track the given address (latitude and longitude)
// /route/?src=SOURCE_LATITUDE_COMMA_LONGITUDE&dst=_LATITUDE_COMMA_LONGITUDE&dst=_LATITUDE_COMMA_LONGITUDE
//query string dst can be more than one
//example : http://localhost:3000/route/?src=17.035318,51.107706&dst=25.060768,51.115341&dst=20.058637,51.112269
app.get("/route", (req, res) => {
    const source = req.query.src;
    const destination = req.query.dst;

    if (!source || !destination) {
        return res.send("the source and the destination must be provided!");
    }

    let dest = "";
    destination.forEach((element, index) => {
        if (index == destination.length - 1) {
            dest = dest + element;
        } else {
            dest = dest + element + ";";
        }
    });

    osrm.osrm(source, dest, (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errMessage: `the endpoint doesn't exist - 404`
    })
})

app.get('*', (req, res) => { //* it means that can be match to everything / every endpoints
    res.render('404', {
        errMessage: `the endpoint doesn't work - 404`
    })
})

app.listen(port, () => {
    console.log("conneted to port ", port);
});
