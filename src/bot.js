const Discord = require('discord.js')
const axios = require('axios')
const client = new Discord.Client()
const token = "OTI2NDYzNDI0NTg4ODMyNzY4.Yc8CTQ.KkPaYbMP58eiAzB8pikuHHRmPKE"
const cityURL = "http://dataservice.accuweather.com/locations/v1/topcities/150?apikey="
const key = "xNH9a9gqiaLJbUG1Rm5sAWIOtXHiLlbS"
const weatherURL = "http://dataservice.accuweather.com/currentconditions/v1/"

const getForcast = async (cityname = 'tokyo', res) => {
    try {
        const response = await axios.get(cityURL + key);
        const thecity = response.data.filter(d => d.EnglishName.toLowerCase() === cityname.toLowerCase());
        //console.log(thecity[0])

        if (thecity.length === 0) {
            console.log('Please enter a valid location');
        } else {
            const response2 = await axios.get(weatherURL + thecity[0].Key + '?apikey=' + key);
            const data = response2.data[0];
            //console.log(thecity[0].EnglishName, data.Temperature.Metric.Value, data.Temperature.Metric.Unit)
            let newData = {
                name:thecity[0].EnglishName,
                temp: data.Temperature.Metric.Value
            }

            return newData
        }
    } catch (e) {
        console.log(e);
    }
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', async (msg) => {
    if(msg.content.includes('!w')){        
        const cityname = msg.content.slice(3).trim().toLowerCase()
        const rep = await getForcast(cityname)
        msg.reply(`The temperature in ${rep.name} is ${rep.temp}°C`)
    }
})

client.login(token)