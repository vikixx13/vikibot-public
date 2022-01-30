const {Command} = require("reconlx");

module.exports = new Command({
    name:"ping",
    description:"returns websocket ping",
    type:"CHAT_INPUT",
    userPermissions:['ADMINISTRATOR'],
    execute : async({interaction , client})=>{
        interaction.reply({content:`${client.ws.ping}ms`})
    }
});