const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const TelegrafInlineMenu = require('telegraf-inline-menu')

const getConfig = require('./src/config/config')
const config = getConfig('env_')
const bot = new Telegraf(config.bot_section.bot_token)

let answered_data = {};

bot.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log('Response time %sms', ms);
})

bot.catch((err) => {
    console.log('Ooops', err)
})


bot.start((ctx) => {
    ctx.reply(
        `Welcome ${ctx.from.first_name} сюда нужен текст`,
        Markup.inlineKeyboard([
            Markup.callbackButton('Start survey', 'survey')
        ]).extra()
    )
})

bot.action('survey', (ctx) => {
    ctx.reply(
        `So, let's choose lang`,
        Markup.keyboard([
            Markup.callbackButton('Узбек кирил', 'survey_uz_kyr'),
            Markup.callbackButton('Uzbek latin', 'survey_uz_lat'),
            Markup.callbackButton('Русский', 'survey_ru'),
        ])
        .oneTime()
        .resize()
        .extra()
    )
})

bot.hears('Узбек кирил', (ctx) => {
    answered_data.q1 = "uzbek"
    ctx.reply('Choosed uzbek kyr')
    console.log(answered_data.q1)
})

bot.hears('Uzbek latin', (ctx) => {
    ctx.reply('Choosed uzbek latin ')
})

bot.hears('Русский', (ctx) => {
    // ctx.reply('выбран опрос на русском'),
    ctx.reply(
        `Сколько вам лет?`,
        Markup.inlineKeyboard([
            Markup.callbackButton('до 18', 'до 18'),
            Markup.callbackButton('18-25', '18-25'),
            Markup.callbackButton('25-35', '25-35'),
            Markup.callbackButton('35-45', '35-45'),
            Markup.callbackButton('45-55', '45-55'),
            Markup.callbackButton('больше 55', 'больше 55'),
        ])
        .oneTime()
        .resize()
        .extra()
    )
})

bot.launch()




















// const food = ['bread', 'cake', 'bananas']


// function foodSelectText(ctx) {
//     const person = ctx.match[1]
//     const hisChoice = people[person].food
//     if (!hisChoice) {
//         return `${person} is still unsure what to eat.`
//     }
    
//     return `${person} likes ${hisChoice} currently.`
//     }

// const foodSelectSubmenu = new TelegrafInlineMenu(foodSelectText)
// .toggle('Prefer Tee', 't', {
//     setFunc: (ctx, choice) => {
//     const person = ctx.match[1]
//     people[person].tee = choice
//     },
//     isSetFunc: ctx => {
//     const person = ctx.match[1]
//     return people[person].tee === true
//     }
// })
// .select('f', food, {
//     setFunc: (ctx, key) => {
//     const person = ctx.match[1]
//     people[person].food = key
//     },
//     isSetFunc: (ctx, key) => {
//     const person = ctx.match[1]
//     return people[person].food === key
//     }
// })

// // bot.startPolling()
// bot.launch()

