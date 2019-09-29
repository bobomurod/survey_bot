const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const TelegrafInlineMenu = require('telegraf-inline-menu')

const getConfig = require('./src/config/config')
const config = getConfig('env_')
const bot = new Telegraf(config.bot_section.bot_token)

bot.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log('Response time %sms', ms);
})

// bot.use(Telegraf.log())

bot.catch((err) => {
    console.log('Ooops', err)
})


const User = {
    currentState: 'INIT'
};

const EVENTS = {

    ['INIT']: {
        async init() {
            let name ;

            try {
                console.log("Start asking");
                await bot.start(async (ctx) => {
                await ctx.reply(
                    `Согласен с обработкой персональных данных \n
                    Shaxsiy ma'lumotlar bilan bo'lishishga roziman \n
                    Шахсий маълумотлар билан бўлишишга розиман`,
                    Markup.inlineKeyboard([
                        Markup.callbackButton('Start', 'survey')
                    ]).extra()
                )
            })
            
        } catch (error) {
            console.log(error);
        }
        
            return await {
                name: 'ASK_AGREEMENT'
            }
            
        },
        async exit() {
            console.log("Init end");
        },
        next: 'CHOOSE_LANG'
    },

    ['CHOOSE_LANG']: {
        async init() {
            console.log("Choose lang");
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
            return {
                name: 'ASK_AGREEMENT'
            }
        },
        async exit() {
            console.log("Choose lang end");
        },
        next: 'ASK_AGREEMENT'
    },

    ['ASK_AGREEMENT_RU']: {
        async init() {
            console.log("Asking agreement ru");
            bot.action('survey', (ctx) => {
                ctx.reply(
                    `Вы согласны с обработк`,
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
            return {
                name: 'ASK_AGE'
            }
        },
        async exit() {
            console.log("Asking agreement end");
        },
        next: 'ASK_AGE'
    },

    ['ASK_AGE']:{
        async init() {
            console.log("Asking age");
            
            return {
                name: 'ASK_GENDER'
            }
        },
        async exit() {
            console.log("Exit ask age");
        },
        next: 'ASK_GENDER'
    },

    ['ASK_GENDER']: {
        async init() {
            console.log("Asking gender");
            return {
                name: 'ASK_CITY'
            }
        },
        async exit() {
            console.log("Exit ask gender");
        }
    }

}

async function request(stage) {
    const stageQueue = [];
    stageQueue.unshift(stage);

    async function processStack(stage) {
        console.log("--== processing stack ==--");
        const nextStage = await EVENTS[stage].init()
        if (nextStage) {
            console.log("-> EXIT", stage);
            await EVENTS[stage].exit()
            stageQueue.unshift(nextStage)
        }
    }

    while(stageQueue.length) {
        const stage = stageQueue.pop();
        console.log("-> PROCESS", stage);
        console.log(stage.name);
        await processStack(stage.name)
    }
}



(async() => {
    console.log("bot started");
    await request({
        name: 'INIT'
    })
})()

bot.launch()