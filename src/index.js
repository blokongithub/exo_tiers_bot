require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, SlashCommandBuilder, GatewayIntentBits, ChannelType} = require('discord.js');
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db", sqlite3.OPEN_READWRITE,(err) => {
    if (err) {return console.error(err.message);}
});
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online`);
    client.user.setActivity("epic pro bot")
    new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!');
});

client.login(
    process.env.TOKEN
);