// const Telegraf = require('telegraf')
// const getConfig = require('../config/config')



import Telegraf from 'telegraf';

import { getConfig } from '../config/config'


const config = getConfig('env_');

const bot = new Telegraf(config.bot_section.bot_token)
bot.start((ctx: any) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => {
    console.log("Hey Nikolay")
    ctx.reply('Hey Nikolay')
})
bot.launch()