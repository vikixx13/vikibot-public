const {Command} = require("reconlx");
const {MessageEmbed, AutocompleteInteraction} = require('discord.js');

module.exports = new Command({
    name:"help",
    description:"gives list of commands",
    type:"CHAT_INPUT",
    userPermissions:['ADMINISTRATOR'],
    execute : async({interaction , client})=>{

        const embedH = new MessageEmbed();
        embed.setColor('#0DD0B4')
        .setTitle('Vikibot commands')
        .setURL('https://discord.gg/sSW5HND96k/')
        .setAuthor({ name: 'viki',  url: 'https://discord.gg/sSW5HND96k' })
        .setDescription('list of vikibot commands')
        .addFields(
            { name: 'help', value: 'Gives list of commands' },
            { name: 'pings', value: 'returns ping' },
            { name: 'whois', value: 'returns user info' },
        )
        .setImage('https://static.wikia.nocookie.net/asdfmovie/images/c/c7/Jimmy.png/revision/latest?cb=20180616213609')
        .setFooter({ text: 'Join the bot testing server from link in bot status', iconURL: 'https://static.wikia.nocookie.net/asdfmovie/images/c/c7/Jimmy.png/revision/latest?cb=20180616213609' });

        interaction.reply({embeds:[embedH]});
    }
});