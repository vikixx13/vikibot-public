
const {Client , Intents , Collection, Message,MessageEmbed} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS , Intents.FLAGS.GUILD_MEMBERS]})
const config = require('./config.json');

client.commands = new Collection();
client.events = new Collection();

module.exports = client;


require('./handler/handler.js')(client);

client.login(config.Token);
