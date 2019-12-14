const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoiemVuaHV6YWluaSIsImEiOiJjanlzeXRobTQwMTZ3M2JwMXFsdXFlbDdsIn0.-MWjWymxxtz1_1BbMPmmRg`
    request({ url, json: true }, (err, res) => {
        if (err) {
            return callback(err, undefined)
        } else if (res.body.features.length == 0) {
            return callback('result is none', undefined)
        } else {
            const result = {
                longitude: res.body.features[0].center[0],
                latitude: res.body.features[0].center[1]
            }
            return callback(undefined, result)
        }
    })
}

// geocode("grundwaldzki", (err, res)=>{
// if (err) {
//     return console.log(err)
// }
// console.log(res)
// })

module.exports = { geocode: geocode }