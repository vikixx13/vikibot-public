import { guildId } from "./config.json";

export Default async function register(commands){
  
  if(guildId){
  await client.guilds.cache.get(guildId).commands.set(commands);
   console.log("Successfully Registered Commands on Development Guild");
  }else{
    await client.application.commands.set(commands);
    console.log("Successfully Registered Commands Globally");
  }
  
}
