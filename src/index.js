const app = require('express')();
const axios = require('axios');
const { response } = require('express');

const URL = "http://www.bom.gov.au/fwo/IDN60801/IDN60801.95765.json";
const FILTER_TEMP = 20;

app.get('/', async (req, res ) => {
    let highTempStations = [];

    try {
        const response = await axios.get(URL);
        const data = response.data["observations"]["data"];

        data.forEach(station => {
            if (station["apparent_t"] > FILTER_TEMP) {
                highTempStations.push({
                    name: station["name"],
                    apparent_t: station["apparent_t"],
                    lat: station["lat"],
                    long: station["lon"]
                });
            }
        });
        highTempStations.sort((a, b) => parseFloat(a.apparent_t) - parseFloat(b.apparent_t));
        res.json(highTempStations);
    } catch (error) {
        res.json({
            status: 503,
            error: error["message"]
        });
        console.log(error);
    }
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`) );