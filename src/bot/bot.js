const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const getConfig = require('../config/config')



// import Telegraf from 'telegraf';

// import { getConfig } from '../config/config'


const config = getConfig('env_');

const bot = new Telegraf(config.bot_section.bot_token)

const keyboard = Markup.inlineKeyboard([
    Markup.urlButton('❤️', 'http://telegraf.js.org'),
    Markup.callbackButton('Delete', 'delete')
  ])

bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => {
    console.log("Hey Nikolay")
    ctx.reply('Hey Nikolay')
    ctx.reply(ctx.from)
})

const testMenu = Telegraf.Extra
  .markdown()
  .markup((m) => m.inlineKeyboard([
    m.callbackButton('Find button', 'find'),
    m.callbackButton('Find button', 'find')
 ]));

bot.hears('menu', (ctx) => ctx.reply("message",testMenu))

// bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.from.id, ctx.message, Extra.markup(keyboard)))


bot.command('onetime', ({ reply }) =>
  reply('One time keyboard', Markup
    .keyboard(['/simple', '/inline', '/pyramid'])
    .oneTime()
    .resize()
    .extra()
  )
)

bot.command('custom', ({ reply }) => {
  return reply('Custom buttons keyboard', Markup
    .keyboard([
      ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
      ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
      ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
    ])
    .oneTime()
    .resize()
    .extra()
  )
})

 
bot.hears('inline', (ctx) => ctx.reply('this is inline',Markup.inlineKeyboard([
    Markup.urlButton('❤️', 'http://telegraf.js.org'),
    Markup.callbackButton('➡️ Next', 'next')
]).extra()
));

bot.command('oldschool', (ctx) => ctx.reply('Hello'))



bot.launch().then(()=>{
    console.log("bot server listening");
})