const request = require("request")

const osrm = (addressOrigin, adressDestination, callback) => {
    const url = `http://router.project-osrm.org/table/v1/driving/${addressOrigin};${adressDestination}?sources=0`;
    request({ url, json: true }, (err, res) => {
        if (err) {
            return callback("cannot connect", undefined);
        } else if (res.body.message === "Too Many Requests") {
            callback("too many request, please try again..", undefined);
        } else {
            callback(undefined, res.body);
        }
    });
};

// const source = '17.060976,51.115321'
// const destination = '17.063264,51.114397'

// osrm(source, destination, (err,res)=>{
// if (err) {
//     return console.log(err)
// }

// console.log(res)
// })

module.exports = { osrm: osrm };
