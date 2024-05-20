require('dotenv').config();
const { Client, IntentsBitField, GatewayIntentBits} = require('discord.js');
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

function checkIfValueExists(table, column, value, callback) {

    let sql = `SELECT 1 FROM ${table} WHERE ${column} = ?`;

    db.get(sql, [value], (err, row) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
            return;
        }
        
        callback(null, row ? true : false);
    });
}
client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online`);
    client.user.setActivity("epic pro bot")
});

client.on('interactionCreate', async (interaction) => {
    if(interaction.isChatInputCommand()) {
        if(interaction.commandName === "setteir") {
            const teir = interaction.options.get("teir").value
            const user = interaction.options.get("target").user.id
            const guildMember = await interaction.guild.members.fetch(interaction.user.id);
            const logchannelpriv = client.channels.cache.get('1242185431085350942');
            const logchannelpub = client.channels.cache.get('1241815925905162301');
            const requiredRoleId = '1241831691862147122';
            
            if (!guildMember.roles.cache.has(requiredRoleId)) {
                interaction.reply({ content: 'You do not have the required role to use this command.', ephemeral: true });
                return;
            }
            let sql;
            logchannelpriv.send(`the user ${guildMember} set the tier of <@${user}> to ${teir}.`);
            logchannelpub.send(`the user ${guildMember} set the tier of <@${user}> to ${teir}.`);
            checkIfValueExists("tiers", "discord_id", user, (err, exists) => {
                if (err) {
                    console.error('Error checking value existence:', err);
                    return;
                }
                
                if (exists) {
                    sql = "UPDATE tiers SET tier = ? WHERE discord_id = ?";
                    db.run(sql, [teir, user], err => {
                        if (err) {
                            console.error(err.message);
                            return;
                        }
                        interaction.reply(`Updated tier for user <@${user}> to ${teir}.`);
                    });
                } else {
                    sql = "INSERT INTO tiers(discord_id, tier) VALUES (?, ?)"
                    db.run(sql, [user, teir], err =>{
                        if (err) {
                            console.log(error.message);
                        }
                        interaction.reply(`Set tier for user <@${user}> to ${teir}.`);
                    });
                }
            });
        
        }
        if(interaction.commandName === "tier") {
            const user = interaction.options.get("target").user.id;
            let sql = "SELECT tier FROM tiers WHERE discord_id = ?";
            db.get(sql, [user], (err, row) => {
                if (err) {
                    console.error(err.message);
                    interaction.reply({ content: 'There was an error retrieving the tier.', ephemeral: true });
                    return;
                }

                if (row) {
                    interaction.reply({ content: `<@${user}>'s tier is ${row.tier}`, ephemeral: true });
                } else {
                    interaction.reply({ content: `<@${user}> does not have a tier set.`, ephemeral: true });
                }
            });
        }
    }
});

client.login(
    process.env.TOKEN
);