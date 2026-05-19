const { Client, GatewayIntentBits, Events } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on(Events.GuildMemberAdd, member => {
  const channel = member.guild.systemChannel;
  if (!channel) return;
  channel.send(`👋 Welcome ${member.user.username}!`);
});

client.on(Events.MessageCreate, message => {
  if (message.author.bot) return;
  if (message.content === "ping") {
    message.reply("pong ✅");
  }
});

client.login(process.env.TOKEN);