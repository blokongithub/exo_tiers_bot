require('dotenv').config();
const { Client, IntentsBitField, GatewayIntentBits, EmbedBuilder} = require('discord.js');
const sqlite3 = require("sqlite3").verbose();
const fs = require('fs');
const path = require('path');

const randomlevels = [
    "gen_1 - easy_1",
    "gen_1 - easy_2",
    "gen_1 - easy_3",
    "gen_1 - easy_4",
    "gen_1 - easy_5",
    "gen_1 - easy_6",
    "gen_1 - easy_7",
    "gen_1 - easy_8",
    "gen_1 - easy_9",
    "gen_1 - easy_10",
    "gen_1 - easy_11",
    "gen_1 - easy_12",
    "gen_1 - easy_13",
    "gen_1 - medium_1",
    "gen_1 - medium_2",
    "gen_1 - medium_3",
    "gen_1 - medium_4",
    "gen_1 - medium_5",
    "gen_1 - medium_6",
    "gen_1 - medium_7",
    "gen_1 - medium_8",
    "gen_1 - medium_9",
    "gen_1 - medium_10",
    "gen_1 - medium_11",
    "gen_1 - medium_12",
    "gen_1 - medium_13",
    "gen_1 - hard_1",
    "gen_1 - hard_2",
    "gen_1 - hard_3",
    "gen_1 - hard_4",
    "gen_1 - hard_5",
    "gen_1 - hard_6",
    "gen_1 - hard_7",
    "gen_1 - hard_8",
    "gen_1 - hard_9",
    "gen_1 - hard_10",
    "gen_1 - hard_11",
    "gen_1 - hard_12",
    "gen_1 - hard_13",
    "gen_2 - easy_1",
    "gen_2 - easy_2",
    "gen_2 - easy_3",
    "gen_2 - easy_4",
    "gen_2 - easy_5",
    "gen_2 - easy_6",
    "gen_2 - easy_7",
    "gen_2 - easy_8",
    "gen_2 - easy_9",
    "gen_2 - easy_10",
    "gen_2 - medium_1",
    "gen_2 - medium_2",
    "gen_2 - medium_3",
    "gen_2 - medium_4",
    "gen_2 - medium_5",
    "gen_2 - medium_6",
    "gen_2 - medium_7",
    "gen_2 - medium_8",
    "gen_2 - medium_9",
    "gen_2 - medium_10",
    "gen_2 - hard_1",
    "gen_2 - hard_2",
    "gen_2 - hard_3",
    "gen_2 - hard_4",
    "gen_2 - hard_5",
    "gen_2 - hard_6",
    "gen_2 - hard_7",
    "gen_2 - hard_8",
    "gen_2 - hard_9",
    "gen_2 - hard_10",
    "s2, lvl1",
    "s2, lvl2",
    "s2, lvl3",
    "s2, lvl4",
    "s2, lvl5",
    "s2, lvl6",
    "s2, lvl7",
    "s2, lvl8",
    "s2, lvl9",
    "s2, lvl10",
    "s2, lvl11",
    "s3, lvl1",
    "s3, lvl2",
    "s3, lvl3",
    "s3, lvl4",
    "s3, lvl5",
    "s3, lvl6",
    "s3, lvl7",
    "s3, lvl8",
    "s3, lvl9",
    "s3, lvl10",
    "s3, lvl11",
    "s3, lvl12",
    "s4, lvl1",
    "s4, lvl2",
    "s4, lvl3",
    "s4, lvl4",
    "s4, lvl5",
    "s4, lvl6",
    "s4, lvl7",
    "s4, lvl8",
    "s4, lvl9",
    "s4, lvl10",
    "s4, lvl11",
    "s4, lvl12",
    "s5, lvl1",
    "s5, lvl2",
    "s5, lvl3",
    "s5, lvl4",
    "s5, lvl5",
    "s5, lvl6",
    "s5, lvl7",
    "s5, lvl8",
    "s5, lvl9",
    "s5, lvl10",
    "s5, lvl11",
    "s5, lvl12",
    "s6, lvl1",
    "s6, lvl2",
    "s6, lvl3",
    "s6, lvl4",
    "s6, lvl5",
    "s6, lvl6",
    "s6, lvl7",
    "s6, lvl8",
    "s6, lvl9",
    "s6, lvl10",
    "s6, lvl11",
    "s6, lvl12",
    "s7, lvl1",
    "s7, lvl2",
    "s7, lvl3",
    "s7, lvl4",
    "s7, lvl5",
    "s7, lvl6",
    "s7, lvl7",
    "s7, lvl8",
    "s7, lvl9",
    "s7, lvl10",
    "s7, lvl11",
    "s7, lvl12",
    "s8, lvl1",
    "s8, lvl2",
    "s8, lvl3",
    "s8, lvl4",
    "s8, lvl5",
    "s8, lvl6",
    "s8, lvl7",
    "s8, lvl8",
    "s8, lvl9",
    "s8, lvl10",
    "s8, lvl11",
    "s8, lvl12",
    "s9, lvl1",
    "s9, lvl2",
    "s9, lvl3",
    "s9, lvl4",
    "s9, lvl5",
    "s9, lvl6",
    "s9, lvl7",
    "s9, lvl8",
    "s9, lvl9",
    "s9, lvl10",
    "s9, lvl11",
    "s9, lvl12",
    "s10, lvl1",
    "s10, lvl2",
    "s10, lvl3",
    "s10, lvl4",
    "s10, lvl5",
    "s10, lvl6",
    "s10, lvl7",
    "s10, lvl8",
    "s10, lvl9",
    "s10, lvl10",
    "s10, lvl11",
    "s10, lvl12",
    "s11, lvl1",
    "s11, lvl2",
    "s11, lvl3",
    "s11, lvl4",
    "s11, lvl5",
    "s11, lvl6",
    "s11, lvl7",
    "s11, lvl8",
    "s11, lvl9",
    "s11, lvl10",
    "s11, lvl11",
    "s11, lvl12",
    "s12, lvl1",
    "s12, lvl2",
    "s12, lvl3",
    "s12, lvl4",
    "s12, lvl5",
    "s12, lvl6",
    "s12, lvl7",
    "s12, lvl8",
    "s12, lvl9",
    "s12, lvl10",
    "s12, lvl11",
    "s12, lvl12",
    "s13, lvl1",
    "s13, lvl2",
    "s13, lvl3",
    "s13, lvl4",
    "s13, lvl5",
    "s13, lvl6",
    "s13, lvl7",
    "s13, lvl8",
    "s13, lvl9",
    "s13, lvl10",
    "s13, lvl11",
    "s13, lvl12",
    "s14, lvl1",
    "s14, lvl2",
    "s14, lvl3",
    "s14, lvl4",
    "s14, lvl5",
    "s14, lvl6",
    "s14, lvl7",
    "s14, lvl8",
    "s14, lvl9",
    "s14, lvl10",
    "s14, lvl11",
    "s14, lvl12",
    "s15, lvl1",
    "s15, lvl2",
    "s15, lvl3",
    "s15, lvl4",
    "s15, lvl5",
    "s15, lvl6",
    "s15, lvl7",
    "s15, lvl8",
    "s15, lvl9",
    "s15, lvl10",
    "s15, lvl11",
    "s15, lvl12",
    "s16, lvl1",
    "s16, lvl2",
    "s16, lvl3",
    "s16, lvl4",
    "s16, lvl5",
    "s16, lvl6",
    "s16, lvl7",
    "s16, lvl8",
    "s16, lvl9",
    "s16, lvl10",
    "s16, lvl11",
    "s16, lvl12",
    "s17, lvl1",
    "s17, lvl2",
    "s17, lvl3",
    "s17, lvl4",
    "s17, lvl5",
    "s17, lvl6",
    "s17, lvl7",
    "s17, lvl8",
    "s17, lvl9",
    "s17, lvl10",
    "s17, lvl11",
    "s17, lvl12",
    "s18, lvl1",
    "s18, lvl2",
    "s18, lvl3",
    "s18, lvl4",
    "s18, lvl5",
    "s18, lvl6",
    "s18, lvl7",
    "s18, lvl8",
    "s18, lvl9",
    "s18, lvl10",
    "s18, lvl11",
    "s18, lvl12",
    "s19, lvl1",
    "s19, lvl2",
    "s19, lvl3",
    "s19, lvl4",
    "s19, lvl5",
    "s19, lvl6",
    "s19, lvl7",
    "s19, lvl8",
    "s19, lvl9",
    "s19, lvl10",
    "s19, lvl11",
    "s19, lvl12",
    "s20, lvl1",
    "s20, lvl2",
    "s20, lvl3",
    "s20, lvl4",
    "s20, lvl5",
    "s20, lvl6",
    "s20, lvl7",
    "s20, lvl8",
    "s20, lvl9",
    "s20, lvl10",
    "s20, lvl11",
    "s20, lvl12",
    "s21, lvl1",
    "s21, lvl2",
    "s21, lvl3",
    "s21, lvl4",
    "s21, lvl5",
    "s21, lvl6",
    "s21, lvl7",
    "s21, lvl8",
    "s21, lvl9",
    "s21, lvl10",
    "s21, lvl11",
    "s21, lvl12",
    "s22, lvl1",
    "s22, lvl2",
    "s22, lvl3",
    "s22, lvl4",
    "s22, lvl5",
    "s22, lvl6",
    "s22, lvl7",
    "s22, lvl8",
    "s22, lvl9",
    "s22, lvl10",
    "s22, lvl11",
    "s22, lvl12",
    "s23, lvl1",
    "s23, lvl2",
    "s23, lvl3",
    "s23, lvl4",
    "s23, lvl5",
    "s23, lvl6",
    "s23, lvl7",
    "s23, lvl8",
    "s23, lvl9",
    "s23, lvl10",
    "s23, lvl11",
    "s23, lvl12",
    "ranked pack1, lvl1",
    "ranked pack1, lvl2",
    "ranked pack1, lvl3",
    "ranked pack1, lvl4",
    "ranked pack1, lvl5",
    "ranked pack1, lvl6",
    "ranked pack1, lvl7",
    "ranked pack1, lvl8",
    "ranked pack2, lvl1",
    "ranked pack2, lvl2",
    "ranked pack2, lvl3",
    "ranked pack2, lvl4",
    "ranked pack2, lvl5",
    "ranked pack2, lvl6",
    "ranked pack2, lvl7",
    "ranked pack2, lvl8",
    "ranked pack3, lvl1",
    "ranked pack3, lvl2",
    "ranked pack3, lvl3",
    "ranked pack3, lvl4",
    "ranked pack3, lvl5",
    "ranked pack3, lvl6",
    "ranked pack3, lvl7",
    "ranked pack3, lvl8",
    "ranked pack4, lvl1",
    "ranked pack4, lvl2",
    "ranked pack4, lvl3",
    "ranked pack4, lvl4",
    "ranked pack4, lvl5",
    "ranked pack4, lvl6",
    "ranked pack4, lvl7",
    "ranked pack4, lvl8",
    "ranked pack5, lvl1",
    "ranked pack5, lvl2",
    "ranked pack5, lvl3",
    "ranked pack5, lvl4",
    "ranked pack5, lvl5",
    "ranked pack5, lvl6",
    "ranked pack5, lvl7",
    "ranked pack5, lvl8",
    "ranked pack6, lvl1",
    "ranked pack6, lvl2",
    "ranked pack6, lvl3",
    "ranked pack6, lvl4",
    "ranked pack6, lvl5",
    "ranked pack6, lvl6",
    "ranked pack6, lvl7",
    "ranked pack6, lvl8",
    "ranked pack7, lvl1",
    "ranked pack7, lvl2",
    "ranked pack7, lvl3",
    "ranked pack7, lvl4",
    "ranked pack7, lvl5",
    "ranked pack7, lvl6",
    "ranked pack7, lvl7",
    "ranked pack7, lvl8",
    "ranked pack8, lvl1",
    "ranked pack8, lvl2",
    "ranked pack8, lvl3",
    "ranked pack8, lvl4",
    "ranked pack8, lvl5",
    "ranked pack8, lvl6",
    "ranked pack8, lvl7",
    "ranked pack8, lvl8",
    "ranked pack9, lvl1",
    "ranked pack9, lvl2",
    "ranked pack9, lvl3",
    "ranked pack9, lvl4",
    "ranked pack9, lvl5",
    "ranked pack9, lvl6",
    "ranked pack9, lvl7",
    "ranked pack9, lvl8"
]

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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} is online`);
    client.user.setActivity("with blok");
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
            //logchannelpub.send(`the user ${guildMember} set the tier of <@${user}> to ${teir}.`);
            checkIfValueExists("tiers", "discord_id", user, (err, exists) => {
                if (err) {
                    console.error('Error checking value existence:', err);
                    return;
                }
                const embed = new EmbedBuilder()
                    .setTitle("__PLAYER__")
                    .setDescription(`<@${user}>`)
                    .addFields(
                        {
                        name: "__TEIR__",
                        value: `${teir}`,
                        inline: false
                        },
                        {
                        name: "__TESTER__",
                        value: `${guildMember}`,
                        inline: false
                        },
                    )
                    .setColor("#00b0f4")
                    .setTimestamp();
                logchannelpub.send({ embeds: [embed] });
                if (exists) {
                    sql = "UPDATE tiers SET tier = ? WHERE discord_id = ?";
                    db.run(sql, [teir, user], err => {
                        if (err) {
                            console.error(err.message);
                            return;
                        }
                        interaction.reply({ content: `Updated tier for user <@${user}> to ${teir}`, ephemeral: true});
                    });
                } else {
                    sql = "INSERT INTO tiers(discord_id, tier) VALUES (?, ?)"
                    db.run(sql, [user, teir], err =>{
                        if (err) {
                            console.log(error.message);
                        }
                        interaction.reply({ content: `Set tier for user <@${user}> to ${teir}`, ephemeral: true});
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
        if(interaction.commandName === "levels") {
            const repeats = interaction.options.get("repeats").value;
            if(repeats > 7) {
                interaction.reply("please do not use this to spam discord")
                return;
            }
            let chosen = [];
            for(let i = 0; i < repeats; i++) {
                chosen[i] = randomlevels[getRandomInt(404)]
            }
            console.log(chosen);

            let feilds = [];
            for(let i = 0; i < chosen.length; i++) {
                feilds.push({name: String(i+1), value: chosen[i], inline: false});
            }
            const embed = new EmbedBuilder()
                .setTitle("__LEVELS__")
                .setColor("#00b0f4")
                .setTimestamp();
            console.log(embed)
            console.log(feilds)
            feilds.forEach(feild => {
                embed.addFields(feild);
            });
            interaction.reply({ embeds: [embed] });
        }
        
    }
});

client.login(
    process.env.TOKEN
);