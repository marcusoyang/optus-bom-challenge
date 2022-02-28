const app = require('express')();
const axios = require('axios');

const URL = "http://www.bom.gov.au/fwo/IDN60801/IDN60801.95765.json";
const FILTER_TEMP = 20;

const filterStations = (data) => {
    arr = [];
    data.forEach(station => {
        if (station["apparent_t"] > FILTER_TEMP) {
            arr.push({
                name: station["name"],
                apparent_t: station["apparent_t"],
                lat: station["lat"],
                long: station["lon"]
            });
        }
    });
    return arr;
}

app.get('/', async (req, res ) => {
    try {
        // GET request using Axios
        const response = await axios.get(URL);
        let highTempStations = filterStations(response.data["observations"]["data"]);
        highTempStations.sort((a, b) => parseFloat(a.apparent_t) - parseFloat(b.apparent_t));
        res.json({ response: highTempStations });
    } catch (error) {
        res.json({
            errors: [{
                status: 503,
                error: error["message"]
            }]
        });
    }
});

const port = process.env.PORT || 8080;

module.exports = filterStations;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`) );
