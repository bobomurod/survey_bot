const Telegraf = require('telegraf')
const getConfig = require('../config/config')

const config = getConfig('env_');

const bot = new Telegraf(config.bot_section.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()