const { Client, Intents, MessageEmbed } = require('discord.js')
const { getForcast } = require('./weather')

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('the bot is ready')
})

client.on('messageCreate', async (msg) => {
    console.log(msg)
    if (msg.author.bot) return;

    if (msg.content === 'ping') {
        msg.reply({
            content: 'pong'
        })

    }
    if (msg.content.includes('!d')) {
        const cityname = msg.content.slice(3).trim().toLowerCase()
        const rep = await getForcast(cityname)
        const imgURL = rep.isDayTime ? 'https://rahul-jain-web-server.herokuapp.com/img/day.png' : 'https://rahul-jain-web-server.herokuapp.com/img/night.png'
        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`The temperature in ${rep.name} is ${rep.Temperature.Metric.Value}°C`)
            .setURL(rep.link)
            .setAuthor({ name: msg.author.username, iconURL: `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.webp?size=80`})
            .addFields(
                { name: 'Country', value: rep.country },
                { name: 'Current time', value: rep.time.slice(11,16)+" GMT+"+rep.time.slice(20), inline: true },
                { name: 'Current date', value: rep.time.slice(0,10), inline: true },
            )
            .setImage(imgURL)
            .setThumbnail(`https://rahul-jain-web-server.herokuapp.com/img/iconspng/${rep.weatherIcon}.png`)
            .setTimestamp()
            .setFooter({ text: `Weather bot by Rahul`, iconURL: 'https://cdn.discordapp.com/avatars/359259183440199681/96b992bbf3107f1d4f6d4be22f5d225b.webp?size=80' });

        msg.channel.send({ embeds: [exampleEmbed] })
    }

    msg.channel.send
})


client.login(process.env.TOKEN)