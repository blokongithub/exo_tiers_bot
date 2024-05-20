const { SlashCommandBuilder, SlashCommandUserOption, SlashCommandStringOption} = require('discord.js');
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db", sqlite3.OPEN_READWRITE,(err) => {
    if (err) {return console.error(err.message);}
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName("settier")
        .setDescription("sets the tier of a user")
        .addUserOption(option => option.setName('target').setDescription('The user'))
        .addStringOption(option =>
            option.setName('teir')
                .setDescription('sets the teir')
                .setRequired(true)
                .addChoices(
                    { name: 'bronze_1', value: 'bronze_1' },
                    { name: 'bronze_2', value: 'bronze_2' },
                    { name: 'bronze_3', value: 'bronze_3' },
                    { name: 'silver_1', value: 'silver_1' },
                    { name: 'silver_2', value: 'silver_2' },
                    { name: 'silver_3', value: 'silver_3' },
                    { name: 'gold_1', value: 'gold_1' },
                    { name: 'gold_2', value: 'gold_2' },
                    { name: 'gold_3', value: 'gold_3' },
                )),
	async execute(interaction) {
		/*let sql;
        sql = "INSERT INTO tiers(discord_id, tier) VALUES (?, ?)"
        db.run(sql, [interaction.option.get("target")], err =>{
            if (err) {
                console.log(error.message);
            }
        });
        */
        console.log(interaction.option.get("target"))

	},
};