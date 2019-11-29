const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    // eslint-disable-line no-unused-vars

    const aocChannel = client.channels.find("name", "advent-of-code");
    const authedUser = message.member.roles.some(r => ["Admin"].includes(r.name));

    if (!authedUser) {
        message.reply("Unauthed!");
        return;
    }

    if (args[0] === "init") client.initAdventEmbed(client.channels.find("name", "advent-of-code"));
    else {
        const StatsService = require("../../web/services/Stats.service");
        const SolutionsService = require("../../web/services/Solutions.service");
        const stats = await StatsService.getStats();
        const recent = await SolutionsService.getRecentSolutions(6);
        const rSols = [];
        await recent.map(r => rSols.push({ name: r.userName, url: r.url }));
        client.updateAdventEmbed({
            stats: [stats.totalSolutions, stats.todaysSolutions, stats.totalUsers],
            recent: rSols
        });
    }
};

exports.help = {
    name: "advent"
};
