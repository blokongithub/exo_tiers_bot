const { REST, Routes, ApplicationCommandOptionType, SlashCommandBuilder, SlashCommandUserOption, SlashCommandStringOption, Options} = require('discord.js');
const sqlite3 = require("sqlite3").verbose();
require('dotenv').config();

const db = new sqlite3.Database("database.db", sqlite3.OPEN_READWRITE,(err) => {
    if (err) {return console.error(err.message);}
});

const commands = [{
    name: "setteir",
    description: "sets a users tier",
    options: [
        {
            name: "target",
            description: "the user that you are tier setting",
            required: true,
            type: ApplicationCommandOptionType.User
        },
        {
            name: "teir",
            description: "the teir of the user",
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
                { name: 'bronze_1', value: 'bronze_1' },
                { name: 'bronze_2', value: 'bronze_2' },
                { name: 'bronze_3', value: 'bronze_3' },
                { name: 'silver_1', value: 'silver_1' },
                { name: 'silver_2', value: 'silver_2' },
                { name: 'silver_3', value: 'silver_3' },
                { name: 'gold_1', value: 'gold_1' },
                { name: 'gold_2', value: 'gold_2' },
                { name: 'gold_3', value: 'gold_3' },
            ]
            
        }
    ]
    },
    {
        name: "tier",
        description: "gets a users tier",
        options: [
            {
                name: "target",
                description: "the user that you are tier setting",
                required: true,
                type: ApplicationCommandOptionType.User
            }]
    },
    {
        name: "levels",
        description: "picks random levels",
        options: {
            name: "repeats",
            description: "returns x amount of levels",
            required: true,
            type: ApplicationCommandOptionType.Integer
        }
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        );

    } catch(error) {
        console.log(error);
    }
})();