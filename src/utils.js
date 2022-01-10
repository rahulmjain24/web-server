const axios = require('axios');

const cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=';
const key = 'xNH9a9gqiaLJbUG1Rm5sAWIOtXHiLlbS';
const weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';

exports.getCity = async (cityname = 'tokyo', res) => {
    try {
        const response = await axios.get(cityURL + key+"&q="+cityname);
        const thecity = response.data[0]
        console.log(thecity)

        if (thecity.length === 0) {
            console.log('Please enter a valid location');
        } else {
           const response2 = await axios.get(weatherURL + thecity.Key + '?apikey=' + key);
            const data = response2.data[0];
            res([data,thecity])
        }
    } catch (e) {
        console.log(e);
    }
};

exports.dummyCity = (call) => {
    const dummy = {
        WeatherText: 'Clear',
        Temperature: {
            Metric: {
                Value: 20, 
                Unit: 'C'
            }
        }
    }

    call(dummy)
}