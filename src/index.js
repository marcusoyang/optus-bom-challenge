const app = require('express')();
const axios = require('axios');

const url = "http://www.bom.gov.au/fwo/IDN60801/IDN60801.95765.json";

app.get('/', async (req, res ) => {
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.json({ error: "Error Connecting to BOM."});
    }



});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`app listening on http://localhost:${port}`) );