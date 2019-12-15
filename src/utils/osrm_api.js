const request = require("request")

let destination_result = []
const osrm = (addressOrigin, adressDestination, callback) => {
    const url = `http://router.project-osrm.org/table/v1/driving/${addressOrigin};${adressDestination}?sources=0`;
    request({ url, json: true }, (err, res) => {
        if (err) {
            return callback("cannot connect", undefined);
        } else if (res.body.message === "Too Many Requests") {
            callback("too many request, please try again..", undefined);
        } else {
            const destination = res.body.destinations
            destination.forEach((dst, index) => {
                if (index !== 0) {
                    destination_result.push({
                        destination: res.body.destinations[index].location.toString(),
                        duration: res.body.durations[0][index],
                        distance: res.body.destinations[index].distance
                    })
                }
            });

            //sSORTING THE NEAREST
            destination_result.sort((a, b) => (a.duration > b.duration) ? 1 : ((b.duration > a.duration) ? -1 : 0));

            console.log('destination result => ', destination_result)

            const result = {
                source: res.body.sources[0].location,
                destination_result
            }
            callback(undefined, result);
            destination_result = []
        }
    });
};

// const source = '17.060976,51.115321'
// const destination = '17.063264,51.114397;17.035318,51.107706;17.039807,51.108434'

// osrm(source, destination, (err, res) => {
//     if (err) {
//         return console.log(err)
//     }

//     console.log(res)
// })

module.exports = { osrm: osrm };
