const filterStations = require("../src/index");

describe("Filter stations function", () => {
    it("filters out apparent_t lower than 20", () => {
        const data = [
            {
                "name": "apparent_t over 20",
                "apparent_t": 20.5,
                "lat": 1,
                "lon": 1
            },
            {
                "name": "apparent_t under 20",
                "apparent_t": 19.5,
                "lat": 1,
                "lon": 1
            }
        ]
        expect(filterStations(data)).toStrictEqual([{
            "name": "apparent_t over 20",
            "apparent_t": 20.5,
            "lat": 1,
            "long": 1
        }])
    });
    it("filters out multiple stations with apparent_t lower than 20", () => {
        const data = [
            {
                "name": "apparent_t over 20",
                "apparent_t": 20.5,
                "lat": 1,
                "lon": 1
            },
            {
                "name": "apparent_t under 20",
                "apparent_t": 19.5,
                "lat": 1,
                "lon": 1
            },
            {
                "name": "apparent_t under 20",
                "apparent_t": 9.88,
                "lat": 1,
                "lon": 1
            },
            {
                "name": "apparent_t under 20",
                "apparent_t": -12,
                "lat": 1,
                "lon": 1
            }
        ]
        expect(filterStations(data)).toStrictEqual([{
            "name": "apparent_t over 20",
            "apparent_t": 20.5,
            "lat": 1,
            "long": 1
        }])
    })
})
