// const rc = require('rc')
// import rc from 'rc';

const rc = require('rc');

// export type ConfigT = {
//     bot_section: {
//         bot_token: string
//     }
// }

// export function getConfig(name: string): ConfigT {
//     const config = rc(name);
//     if (!config) {
//         throw new Error(`Config by name $(name) not found`)
//     }
//     return <ConfigT>rc(name)
// }

module.exports = (name) => {
    return rc(name)
}