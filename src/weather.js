const axios = require('axios')
//require('dotenv').config();
const cityURL = process.env["C_URL"]
const key = process.env["KEY"]
const weatherURL = process.env["W_URL"]

const getForcast = async (cityname = 'tokyo', res) => {
    try {
        const response = await axios.get(cityURL + key + "&q=" + cityname);
        const thecity = response.data[0]
        //console.log(thecity)

        if (thecity.length === 0) {
            console.log('Please enter a valid location');
        } else {
            const response2 = await axios.get(weatherURL + thecity.Key + '?apikey=' + key);
            const data = response2.data[0];
            let newData = {
                condition: data.WeatherText,
                weatherIcon: data.WeatherIcon,
                Temperature: { ...data.Temperature },
                link: data.Link,
                name: thecity.EnglishName,
                country: thecity.Country.LocalizedName,
                isDayTime: data.IsDayTime,
                time: data.LocalObservationDateTime
            }
            console.log(data)
            return newData
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports = { getForcast }