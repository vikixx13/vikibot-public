const {Command} = require('reconlx');
const {MessageEmbed, AutocompleteInteraction} = require('discord.js');

module.exports = new Command({
    name:'whois',
    description:'returns complete information about a user',
    userPermissions:['SEND_MESSAGES'],
    type:'CHAT_INPUT',
    options:[{
        name:'target',
        description:'provide target to get information',
        type:'USER',
        required:true,
		channel_types:'GUILD_TEXT',
		
    }],
    execute: async({client,interaction})=>{
        const args = interaction.options._hoistedOptions;
        const User = args.find(x=>x.name==="target");
        
        

        const embed = new MessageEmbed();
        embed.setAuthor(`${User.member.user.tag}`,User.member.user.avatarURL() )
        .setColor('RANDOM')
        .setThumbnail(User.member.user.avatarURL())
        .setTimestamp()
        .setFooter(`Requested by ${interaction.member.user.tag}` , interaction.member.user.avatarURL())
        .addField("Username", `${User.member.user.username}` , true)
        .addField("Discriminator" , `${User.member.user.discriminator}`, true)
        .addField("UserID" , `${User.member.user.id}` , true)
        .addField("JoinedAt", `${User.member.joinedAt.toLocaleString()}`, true)
        .addField("Account Created At", `${User.member.user.createdAt.toLocaleString()}`, true)
        // .addField("Roles" , `${User.member.user.roles.filter(r => r.name).slice(0,-1)}` , false)
        .addField("Common Information", [
            `Display Name: \`${User.member.displayName}\``,
            `Pending Member: \`${User.member.pending ? 'Yes' : 'No'}\``,
            `Booster: \`${User.member.premiumSince ? 'since ' + User.member.premiumSince.toLocaleString() : 'Nope'}\``
        ].join("\n"));

        interaction.reply({embeds: [embed]});
    }
});