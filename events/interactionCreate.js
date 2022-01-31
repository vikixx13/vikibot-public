const {MessageEmbed , CommandInteraction , Permissions} = require('discord.js');
const client = require("../main");



client.on( "interactionCreate" ,	async (interaction) =>{
        if (!interaction.isCommand()) return;
        // if (!interaction.isButton()) return;
        // if (!interaction.isSelectMenu()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        if(!interaction.member.permissions.has(command.userPermissions)) return interaction.reply({content:`You dont have the following permission \`${command.userPermissions}\`` , ephemeral:true});

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        try {
            await command.execute({client , interaction , args});
        } catch (error) {
            if (error)
            {
                const errorEmbed = new MessageEmbed()
                .setAuthor(interaction.user.tag ,interaction.user.avatarURL() )
                .setColor("RANDOM")
                .setThumbnail(interaction.guild.iconURL())
                .setTimestamp()
                .addField('USERID' , interaction.user.id , false)
                .addField("Command Used" , interaction.commandName , false)
                .addField("Channel Name" , `#${interaction.channel.name}`,false)
                .addField('Guild Name' , interaction.guild.name , false)
                .addField('Guild ID' , interaction.guild.id , false)
                .setTitle("Error Logs")
                .addField("Error" , `${error}` , false);
    
                interaction.client.channels.cache.get('937394269931569303').send({embeds:[errorEmbed]});
    
                console.error(error);
            } 
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
        const actionembed = new MessageEmbed()
        .setAuthor(interaction.user.tag , interaction.user.avatarURL())
        .setTimestamp()
        .setColor('RANDOM')
        .setThumbnail(interaction.guild.iconURL())
        .addField("UserId" , interaction.user.id , false)
        .addField("Command Used" , interaction.commandName , false)
        .addField("Channel Name" , `#${interaction.channel.name}`,false)
        .addField("Guild Name" , interaction.guild.name,false)
        .addField('Guild ID' , interaction.guild.id , false);
        interaction.client.channels.cache.get('937394269931569303').send({embeds:[actionembed]});
    
    

});