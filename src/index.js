const app = require('express')();
const axios = require('axios');

const filterStations = (data, temp) => {
    arr = [];
    data.forEach(station => {
        if (station["apparent_t"] > temp) {
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

const getFilteredResult = async (url, filterTemp) => {
    try {
        // GET request using Axios
        const response = await axios.get(url);
        let highTempStations = filterStations(response.data["observations"]["data"], filterTemp);
        highTempStations.sort((a, b) => parseFloat(a.apparent_t) - parseFloat(b.apparent_t));
        return { response: highTempStations };
    } catch (error) {
        return {
            errors: [{
                status: 503,
                error: error["message"]
            }]
        };
    }
}

app.get('/', (req, res ) => {
    const filterTemp = 20;
    const url = "http://www.bom.gov.au/fwo/IDN60801/IDN60801.95765.json";
    getFilteredResult(url, filterTemp).then(result => {  
        res.json(result);
    })
});

const port = process.env.PORT || 8080;

module.exports = filterStations;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`) );
