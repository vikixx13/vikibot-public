const fs = require('fs');
const config = require('../config');
const mongoose = require ('mongoose');

module.exports = (client)=> {
//Event Handling
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
	const event = require(`../events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//Command Handling
const commands = [];
const cmdFolders = fs.readdirSync(`./commands`);
cmdFolders.forEach(cmdFolder => {
    const cmdFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
    cmdFiles.forEach(file =>{
	const command = require(`../commands/${file}`);
	// Set a new item in the Collection-
	// With the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
    commands.push(command);

    });
});


client.on("ready", async () => {

 
    // Register for a single guild
    // await client.guilds.cache
    //     .get("926738025759776858")
    //     .commands.set(commands);

    // Register for all the guilds the bot is in-
    await client.commands.set(commands);
});
}