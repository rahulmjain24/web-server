const Discord = require('discord.js')
const axios = require('axios')
const client = new Discord.Client()
const token = process.env['TOKEN']
const cityURL = process.env['C_URL']
const key = process.env['KEY']
const weatherURL = process.env['W_URL']

const sendEmbeddedData = (rep) => {
    const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(rep.name)
        .setURL(rep.link)
        .setDescription(`It's currently ${rep.Temperature.Metric.Value}°C in ${rep.name}`)
        .setThumbnail(`/img/icons/${rep.weatherIcon}.svg`)
        .setImage(rep.isDayTime ? '/imag/day.svg' : '/img/night.svg')
        .setTimestamp()

    return exampleEmbed
}

const getForcast = async (cityname = 'tokyo', res) => {
    try {
        const response = await axios.get(cityURL + key + "&q=" + cityname);
        const thecity = response.data[0]

        if (thecity.length === 0) {
            console.log('Please enter a valid location');
        } else {
            const response2 = await axios.get(weatherURL + thecity.Key + '?apikey=' + key);
            const data = response2.data[0];
            let newData = {
                condition:data.WeatherText,
                weatherIcon:data.WeatherIcon,
                Temperature: {...data.Temperature},
                link:data.Link,
                name:thecity.EnglishName,
                country:thecity.Country.LocalizedName,
                isDayTime:data.IsDayTime
            }
            //console.log(newData)
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
        msg.reply({ embeds: [new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(rep.name)
            .setURL(rep.link)
            .setDescription(`It's currently ${rep.Temperature.Metric.Value}°C in ${rep.name}`)
            .setThumbnail(`/img/icons/${rep.weatherIcon}.svg`)
            .setImage(rep.isDayTime ? 'https://rahul-jain-web-server.herokuapp.com/img/day.svg' : 'https://rahul-jain-web-server.herokuapp.com/img/night.svg')
            .setTimestamp()]})
    }
})

client.login(token)